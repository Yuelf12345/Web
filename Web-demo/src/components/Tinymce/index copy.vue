<template>
  <div class="tinymce-container">
    <div class="header">

      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="content">
        <b class="tit">
          <input type="text" placeholder="请输入标题(2~30个字)" v-model="title" class="no-border" />
        </b>
        <div :id="tinymceId" class="tinymce-textarea" style="border: none;" />
      </div>
    </div>
    <div class="controls">
      <div class="controls-header">
        <!-- <input type="file" accept="image/*" capture="camera"> -->
        <el-tag @click="uploadImage">图片</el-tag>
        <el-tag>Aa</el-tag>
        <el-tag>T</el-tag>
        <el-tag @click="setContentStep('undo')">上一步</el-tag>
        <el-tag @click="setContentStep('redo')">下一步</el-tag>
      </div>
      <div class="controls-body">
        <div class="controls-title">文字格式</div>
        <div class="flex">
          <template v-for="fs in fontSizeList">
            <div class="controls-btn" :class="{ 'active': fontStyles.fontSize === fs.value }"
              @click="setFontSize(fs.value)">{{
                fs.name }}</div>
          </template>
          <div class="controls-btn" :class="{ 'active': fontStyles.Bold }" @click="setFontStyle('Bold')">B</div>
          <div class="controls-btn" :class="{ 'active': fontStyles.Italic }" @click="setFontStyle('Italic')">I</div>
          <div class="controls-btn" :class="{ 'active': fontStyles.StrikeThrough }"
            @click="setFontStyle('StrikeThrough')">-
          </div>
          <div class="controls-btn" :class="{ 'active': fontStyles.Underline }" @click="setFontStyle('Underline')">_
          </div>
        </div>
        <div class="controls-title">文字颜色</div>
        <div style="width: 350px; overflow-x: auto;">
          <div class="controls-color-list">
            <template v-for="fc in fontColorList">
              <div class="color-active"
                :style="{ backgroundColor: fontStyles.fontColor === fc.color ? fc.color : 'rgb(243.9, 244.2, 244.8)' }">
                <div class="controls-color-btn" :style="{ backgroundColor: fc.color }"
                  @click="setColorContent(fc.color)">
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="controls-title">高亮颜色</div>
        <div style="width: 350px; overflow-x: auto;">
          <div class="controls-color-list">
            <template v-for="fc in fontColorList">
              <div class="color-active"
                :style="{ backgroundColor: fontStyles.fontBackColor === fc.color ? fc.color : 'rgb(243.9, 244.2, 244.8)' }">
                <div class="controls-color-btn" :style="{ backgroundColor: fc.color }"
                  @click="setBackColorContent(fc.color)">
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="controls-title">对齐方式</div>
        <div class="flex">
          <template v-for="fa in alignmentList">
            <div class="controls-btn" :class="{ 'active': fontStyles.fontAlignment === fa.value }"
              @click="setAlignment(fa.value)">
              {{
                fa.name }}</div>
          </template>
        </div>
        <div class="controls-title">对齐方式</div>
        <div class="flex">
          <template v-for="fa in alignmentList">
            <div class="controls-btn" :class="{ 'active': fontStyles.fontAlignment === fa.value }"
              @click="setAlignment(fa.value)">
              {{
                fa.name }}</div>
          </template>
        </div>
        <div class="controls-title">对齐方式</div>
        <div class="flex">
          <template v-for="fa in alignmentList">
            <div class="controls-btn" :class="{ 'active': fontStyles.fontAlignment === fa.value }"
              @click="setAlignment(fa.value)">
              {{
                fa.name }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, onActivated, onDeactivated, watch, reactive, nextTick } from 'vue'
import { debounce, throttle } from 'lodash';
import plugins from './plugins'
import toolbar from './toolbar'
import loadScript from './dynamicLoadScript'
const title = ref('')
const props = defineProps({
  id: {
    type: String,
    default: () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
  },
  modelValue: {
    type: String,
    default: ''
  },
  width: {
    type: [Number, String],
    required: false,
    default: 'auto'
  },
  height: {
    type: [Number, String],
    required: false,
    default: 360
  },
  toolbar: {
    type: Array,
    required: false,
    default: () => []
  },
  menubar: {
    type: String,
    default: 'file edit insert view format table'
  }
})

const emit = defineEmits(['update:modelValue'])

// const tinymceCDN = 'https://zuiyouliao-prod.oss-cn-beijing.aliyuncs.com/ZYL-HQ/libs/tinymce/5.6.2/tinymce.min.js'
const tinymceCDN = 'https://zuiyouliao-prod.oss-cn-beijing.aliyuncs.com/ZYL-HQ/libs/tinymce-all-in-one@4.9.5/tinymce.min.js'
const tinymceId = computed(() => props.id)
const fullscreen = ref(false)
const wordNum = ref(0)
let editor = null

// 富文本编辑器交互start
const currentTab = ref('editor')
const fontStyles = reactive({
  fontSize: '16px',
  fontColor: 'rgb(33, 53, 71)',
  fontAlignment: 'justifyleft',
  Bold: false,
  Italic: false,
  StrikeThrough: false,
  Underline: false
});
const fontBackColor = ref('rgb(33, 53, 71)')

const fontSizeList = [
  { name: '小', value: '16px' },
  { name: '标准', value: '20px' },
  { name: '大', value: '24px' },
  { name: '超大', value: '28px' },
]

const fontColorList = [
  { color: 'rgb(33, 53, 71)', name: '黑色' },
  { color: 'rgb(255, 51, 51)', name: '红色' },
  { color: 'rgb(255, 153, 0)', name: '橙色' },
  { color: 'rgb(255, 255, 0)', name: '黄色' },
  { color: 'rgb(0, 204, 0)', name: '绿色' },
  { color: 'rgb(0, 153, 255)', name: '蓝色' },
  { color: 'rgb(153, 51, 255)', name: '紫色' },
  { color: 'rgb(255, 255, 255)', name: '白色' },
  { color: 'rgb(204, 204, 204)', name: '灰色' },
  { color: 'rgb(153, 153, 153)', name: '深灰色' }
]

const alignmentList = [
  { name: '左', value: 'justifyleft' },
  { name: '居中', value: 'justifycenter' },
  { name: '右', value: 'justifyright' },
  { name: '两端', value: 'justifyfull' },
]

// 富文本编辑器交互 end
const initTinymce = () => {
  window.tinymce.init({
    selector: `#${tinymceId.value}`,
    mobile: {
      menubar: true
    },
    placeholder: '请输入正文', // 5以上版本才支持placeholder
    toolbar: false,
    menubar: false,
    inline: true,
    height: 650,
    min_height: 400,
    plugins: 'autoresize',
    setup: (editor) => {
      // https://www.tiny.cloud/docs/tinymce/latest/events/#editor-core-events
      // 你可以在这里添加更多的逻辑来处理光标变化
      editor.on('nodechange', handleNodeChange);
    }
  })
  editor = window.tinymce.editors[tinymceId.value]
}

const destroyTinymce = () => {
  const tinymce = window.tinymce?.get(tinymceId.value)
  if (fullscreen.value) {
    tinymce.execCommand('mceFullScreen')
  }

  if (tinymce) {
    tinymce.destroy()
  }
}

const loadCDN = (src) => {
  const existingScript = document.getElementById(src)
  if (existingScript) {
    return
  }
  const script = document.createElement('script')
  script.src = src
  script.id = src
  document.body.appendChild(script)
}

const setEditorContent = (newHtml) => {
  console.log('setEditorContent')
  const editor = (window.tinymce && window.tinymce.activeEditor) || null
  if (!editor) {
    setTimeout(() => {
      setEditorContent(newHtml)
    }, 1000)
    return
  }
  const oldHtml = editor.getContent()
  if (!oldHtml) {
    editor.setContent(newHtml)
  }
}

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      setEditorContent(newVal)
    }
  }
)

onMounted(() => {
  loadScript(tinymceCDN, (err) => {
    if (err) {
      return
    }
    initTinymce()
  })
})

onActivated(() => {
  if (window.tinymce) {
    initTinymce()
  }
})

onUnmounted(() => {
  destroyTinymce()
})

onDeactivated(() => {
  destroyTinymce()
})

// queryCommandValue/queryCommandState: https://www.tiny.cloud/docs/tinymce/latest/editor-command-identifiers/#query-command-states
// 处理函数
const handleNodeChange = () => {
  console.group('handleNodeChange')

  fontStyles.fontSize = editor.queryCommandValue('FontSize');   // 获取当前选区的字体大小
  fontStyles.Bold = editor.queryCommandState('Bold'); // 获取当前选区是否加粗
  fontStyles.Italic = editor.queryCommandState('Italic'); // 获取当前选区是否斜体
  fontStyles.StrikeThrough = editor.queryCommandState('Strikethrough'); // 获取当前选区是否删除线
  fontStyles.Underline = editor.queryCommandState('Underline'); // 获取当前选区是否下划线
  fontStyles.fontColor = editor.queryCommandValue('ForeColor') || 'rgb(33, 53, 71)';  // 获取当前字体颜色
  fontStyles.fontBackColor = editor.queryCommandValue('BackColor') || 'rgb(33, 53, 71)'; // 获取当前字体背景颜色

  // 获取当前选区对齐方式
  const alignmentStates = {
    'justifyleft': editor.queryCommandState('JustifyLeft'),
    'justifycenter': editor.queryCommandState('JustifyCenter'),
    'justifyright': editor.queryCommandState('JustifyRight'),
    'justifyfull': editor.queryCommandState('JustifyFull')
  };

  fontStyles.fontAlignment = Object.keys(alignmentStates).find(key => alignmentStates[key]) || 'justifyleft';  // 找到第一个为 true 的对齐方式
  console.log('Font Styles:===>', fontStyles);

  console.groupEnd()
}

// 交互
const setContentStep = (content) => {
  if (!editor) {
    return
  }
  editor.execCommand(content)
}

const setFontSize = (size) => {
  if (!editor) {
    return
  }
  editor.execCommand('fontsize', false, size)
}
const setAlignment = (fa) => {
  if (!editor) {
    return
  }
  editor.execCommand(fa)
  fontAlignment.value = fa
}
// 设置字体类型 加粗/斜体/删除线/下划线
const setFontStyle = (fs) => {
  if (!editor) {
    return
  }

  // 获取当前格式状态
  const currentState = editor.queryCommandState(fs)
  fontStyles[fs] = !currentState;
  if (currentState) {
    // 如果当前格式已应用，则移除该格式
    console.log('移除该格式======>', fs);
    editor.execCommand(fs, false, false);
  } else {
    // 如果当前格式未应用，则应用该格式
    console.log('设置该格式====>', fs);
    editor.execCommand(fs);
  }
};
const uploadImage = () => {
  // if (!editor) {
  //   return
  // }
  // editor.execCommand('mceInsertContent', false, '[image]')
}
const setColorContent = (foreColor) => {
  if (!editor) {
    return
  }
  editor.execCommand('ForeColor', false, foreColor)
}
const setBackColorContent = (foreBackColor) => {
  if (!editor) {
    return
  }
  editor.execCommand('BackColor', false, foreBackColor)
  fontStyles.fontBackColor = foreBackColor;
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

::-webkit-scrollbar {
  display: none;
}

.tinymce-container {
  display: flex;
  flex-direction: column;
  height: 750;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .main {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    max-height: 750px;
    min-height: 500px;

    .tinymce-textarea {
      border: none;
      /* 移除边框 */
      outline: none;
      /* 移除聚焦时的默认边框 */
    }
  }

  .controls {
    background-color: white;
    position: sticky;
    bottom: 0px;
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 10px 10px 10px;

    .controls-header {
      display: flex;
      height: 20px;
      gap: 10px;
      padding: 10px;
    }


    .controls-body {
      // display: flex;
      // flex-wrap: wrap;
      // flex-direction: column;
      margin-top: 10px;
      // gap: 10px;
      height: 300px;
      overflow-y: auto;
      // 滚动条隐藏


      .controls-title {
        margin-top: 10px;
        font-size: small;
        color: rgb(199.5, 201, 204);
      }



      .controls-btn {
        text-align: center;
        line-height: 40px;
        height: 40px;
        width: 60px;
        display: inline-block;
        border: 1px solid #eee;
        background-color: rgb(243.9, 244.2, 244.8);
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
      }

      .active {
        background-color: rgb(199.5, 201, 204);
      }

      .controls-color-list {
        width: 500px;
        display: flex;
        gap: 20px;
        background-color: rgb(243.9, 244.2, 244.8);
        overflow-x: auto;
        padding: 10px;

        .color-active {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;

          .controls-color-btn {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2.5px solid white;
          }
        }
      }

    }
  }

  .tit {
    border-bottom: 1px solid #eee;
    font-size: 25px;

    .no-border {
      border: none;
      /* 取消边框 */
      outline: none;
      /* 取消默认的聚焦样式 */
    }
  }
}
</style>