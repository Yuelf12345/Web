<template>
  <div class="tinymce-container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="content">
        <b class="tit" v-if="showTitle">
          <input type="text" placeholder="请输入标题(2~30个字)" v-model="title" class="no-border" />
        </b>
        <div :id="tinymceId" class="tinymce-textarea" style="border: none;"></div>
      </div>
    </div>
    <div class="controls">
      <div class="controls-header">
        <div class="controls-header-btn">
          <div @click="uploadImage">
            <svg t="1736740140643" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="25546" width="20" height="20">
              <path
                d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
                fill="#000000" p-id="25547"></path>
            </svg>
          </div>
          <div @click="setContentStep('bold')">Aa</div>
          <div>
            <svg t="1736740304649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="31093" width="16" height="16">
              <path
                d="M85.337088 1024A85.337088 85.337088 0 0 1 0.003072 938.665984V85.334016A85.362688 85.362688 0 0 1 85.337088 0h853.327872a85.337088 85.337088 0 0 1 85.334016 85.334016v853.331968A85.311488 85.311488 0 0 1 938.66496 1024z m0-85.334016h853.327872V85.334016H85.337088z m384-213.334016v-384H298.668032a42.65984 42.65984 0 0 1-42.667008-42.668032 42.656768 42.656768 0 0 1 42.667008-42.674176h426.662912a42.631168 42.631168 0 0 1 42.667008 42.674176 42.63424 42.63424 0 0 1-42.667008 42.668032H554.669056v384a42.630144 42.630144 0 0 1-42.667008 42.665984 42.655744 42.655744 0 0 1-42.66496-42.665984z"
                p-id="31094"></path>
            </svg>
          </div>
        </div>
        <div class="controls-step-btn">
          <div @click="setContentStep('undo')">
            <svg t="1736738989286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2601" width="20" height="20">
              <path d="M20.48 20.48h983.04v983.04H20.48z" fill="#FFFFFF" p-id="2602"></path>
              <path
                d="M311.05024 194.02752a30.72 30.72 0 0 0-43.4176-43.4176L135.82336 282.29632a34.816 34.816 0 0 0 0 49.27488l131.72736 131.6864a30.72 30.72 0 1 0 43.4176-43.4176L228.92544 337.67424h368.0256a241.62304 241.62304 0 0 1 0 483.24608H174.40768a30.72 30.72 0 0 0 0 61.44h422.5024a303.06304 303.06304 0 0 0 0-606.12608H228.84352l82.20672-82.20672z"
                fill="#000000" p-id="2603"></path>
            </svg>
          </div>
          <div style="transform: scaleX(-1);" @click="setContentStep('redo')">
            <svg t="1736738989286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2601" width="20" height="20">
              <path d="M20.48 20.48h983.04v983.04H20.48z" fill="#FFFFFF" p-id="2602"></path>
              <path
                d="M311.05024 194.02752a30.72 30.72 0 0 0-43.4176-43.4176L135.82336 282.29632a34.816 34.816 0 0 0 0 49.27488l131.72736 131.6864a30.72 30.72 0 1 0 43.4176-43.4176L228.92544 337.67424h368.0256a241.62304 241.62304 0 0 1 0 483.24608H174.40768a30.72 30.72 0 0 0 0 61.44h422.5024a303.06304 303.06304 0 0 0 0-606.12608H228.84352l82.20672-82.20672z"
                fill="#000000" p-id="2603"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="controls-body">
        <div class="controls-title">文字格式</div>
        <div class="flex">
          <template v-for="fs in fontSizeList">
            <div class="controls-btn" :class="{ 'active': fontStyles.fontSize === fs.value }"
              @click="setFontSize(fs.value)">
              {{ fs.name }}
            </div>
          </template>
          <div class="controls-btn" :class="{ 'active': fontStyles.Bold }" @click="setFontStyle('Bold')">B</div>
          <div class="controls-btn" :class="{ 'active': fontStyles.Italic }" @click="setFontStyle('Italic')">I</div>
          <div class="controls-btn" :class="{ 'active': fontStyles.StrikeThrough }"
            @click="setFontStyle('StrikeThrough')">-</div>
          <div class="controls-btn" :class="{ 'active': fontStyles.Underline }" @click="setFontStyle('Underline')">_
          </div>
        </div>
        <div class="controls-title">文字颜色</div>
        <div style="width: 400px; overflow-x: auto;">
          <div class="controls-color-list">
            <template v-for="fc in fontColorList">
              <div class="color-active"
                :style="{ backgroundColor: fontStyles.fontColor === fc.color ? fc.color : 'rgb(243.9, 244.2, 244.8)' }">
                <div class="controls-color-btn" :style="{ backgroundColor: fc.color }"
                  @click="setColorContent(fc.color)"></div>
              </div>
            </template>
          </div>
        </div>
        <div class="controls-title">高亮颜色</div>
        <div style="width: 400px; overflow-x: auto;">
          <div class="controls-color-list">
            <template v-for="fc in fontColorList">
              <div class="color-active"
                :style="{ backgroundColor: fontStyles.fontBackColor === fc.color ? fc.color : 'rgb(243.9, 244.2, 244.8)' }">
                <div class="controls-color-btn" :style="{ backgroundColor: fc.color }"
                  @click="setBackColorContent(fc.color)"></div>
              </div>
            </template>
          </div>
        </div>
        <div class="controls-title">对齐方式</div>
        <div class="flex">
          <template v-for="fa in alignmentList">
            <div class="controls-btn" :class="{ 'active': fontStyles.fontAlignment === fa.value }"
              @click="setAlignment(fa.value)">
              {{ fa.name }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from 'lodash';
import plugins from './plugins'
import toolbar from './toolbar'
import loadScript from './dynamicLoadScript'

export default {
  props: {
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
      default: 650
    },
    toolbar: {
      type: Array,
      required: false,
      default: () => []
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '',
      fullscreen: false,
      wordNum: 0,
      editor: null,
      currentTab: 'editor',
      fontStyles: {
        fontSize: '16px',
        fontColor: 'rgb(33, 53, 71)',
        fontAlignment: 'justifyleft',
        Bold: false,
        Italic: false,
        StrikeThrough: false,
        Underline: false
      },
      fontBackColor: 'rgb(33, 53, 71)',
      fontSizeList: [
        { name: '小', value: '16px' },
        { name: '标准', value: '20px' },
        { name: '大', value: '24px' },
        { name: '超大', value: '28px' },
      ],
      fontColorList: [
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
      ],
      alignmentList: [
        { name: '左', value: 'justifyleft' },
        { name: '居中', value: 'justifycenter' },
        { name: '右', value: 'justifyright' },
        { name: '两端', value: 'justifyfull' },
      ],
      tinymceCDN: 'https://zuiyouliao-prod.oss-cn-beijing.aliyuncs.com/ZYL-HQ/libs/tinymce-all-in-one@4.9.5/tinymce.min.js'
    };
  },
  computed: {
    tinymceId() {
      return this.id;
    }
  },
  watch: {
    modelValue(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.setEditorContent(newVal);
      }
    }
  },
  methods: {
    initTinymce() {
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        mobile: {
          menubar: true
        },
        placeholder: '请输入正文',
        toolbar: false,
        menubar: false,
        inline: true,
        height: this.height,
        min_height: 400,
        plugins: 'autoresize',
        setup: (editor) => {
          editor.on('nodechange', this.handleNodeChange);
        }
      });
      this.editor = window.tinymce.editors[this.tinymceId];
    },
    destroyTinymce() {
      const tinymce = window.tinymce?.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen');
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    loadCDN(src) {
      const existingScript = document.getElementById(src);
      if (existingScript) {
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.id = src;
      document.body.appendChild(script);
    },
    setEditorContent(newHtml) {
      console.log('setEditorContent');
      const editor = (window.tinymce && window.tinymce.activeEditor) || null;
      if (!editor) {
        setTimeout(() => {
          this.setEditorContent(newHtml);
        }, 1000);
        return;
      }
      const oldHtml = editor.getContent();
      if (!oldHtml) {
        editor.setContent(newHtml);
      }
    },
    setContentStep(content) {
      if (!this.editor) {
        return;
      }
      this.editor.execCommand(content);
    },
    setFontSize(size) {
      if (!this.editor) {
        return;
      }
      this.editor.execCommand('fontsize', false, size);
    },
    setAlignment(fa) {
      if (!this.editor) {
        return;
      }
      this.editor.execCommand(fa);
      this.fontStyles.fontAlignment = fa;
    },
    setFontStyle(fs) {
      if (!this.editor) {
        return;
      }

      const currentState = this.editor.queryCommandState(fs);
      this.fontStyles[fs] = !currentState;
      if (currentState) {
        console.log('移除该格式======>', fs);
        this.editor.execCommand(fs, false, false);
      } else {
        console.log('设置该格式====>', fs);
        this.editor.execCommand(fs);
      }
    },
    uploadImage() {
      // if (!this.editor) {
      //   return;
      // }
      // this.editor.execCommand('mceInsertContent', false, '[image]');
    },
    setColorContent(foreColor) {
      if (!this.editor) {
        return;
      }
      this.editor.execCommand('ForeColor', false, foreColor);
    },
    setBackColorContent(foreBackColor) {
      if (!this.editor) {
        return;
      }
      this.editor.execCommand('BackColor', false, foreBackColor);
      this.fontStyles.fontBackColor = foreBackColor;
    },
    handleNodeChange() {
      console.group('handleNodeChange');

      this.fontStyles.fontSize = this.editor.queryCommandValue('FontSize');
      this.fontStyles.Bold = this.editor.queryCommandState('Bold');
      this.fontStyles.Italic = this.editor.queryCommandState('Italic');
      this.fontStyles.StrikeThrough = this.editor.queryCommandState('Strikethrough');
      this.fontStyles.Underline = this.editor.queryCommandState('Underline');
      this.fontStyles.fontColor = this.editor.queryCommandValue('ForeColor') || 'rgb(33, 53, 71)';
      this.fontStyles.fontBackColor = this.editor.queryCommandValue('BackColor') || 'rgb(33, 53, 71)';

      const alignmentStates = {
        'justifyleft': this.editor.queryCommandState('JustifyLeft'),
        'justifycenter': this.editor.queryCommandState('JustifyCenter'),
        'justifyright': this.editor.queryCommandState('JustifyRight'),
        'justifyfull': this.editor.queryCommandState('JustifyFull')
      };

      this.fontStyles.fontAlignment = Object.keys(alignmentStates).find(key => alignmentStates[key]) || 'justifyleft';
      console.log('Font Styles:===>', this.fontStyles);

      console.groupEnd();
    }
  },
  mounted() {
    loadScript(this.tinymceCDN, (err) => {
      if (err) {
        return;
      }
      this.initTinymce();
    });
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  beforeDestroy() {
    this.destroyTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  }
};
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
      outline: none;
    }
  }

  .controls {
    background-color: white;
    position: sticky;
    bottom: 0px;
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
    // padding: 0 10px 10px 10px;

    .controls-header {
      display: flex;
      justify-content: space-between;
      height: 20px;
      gap: 10px;
      padding: 10px 0px;

      .controls-header-btn {
        flex: 1;
        display: flex;
        gap: 50px;
      }

      .controls-step-btn {
        display: flex;
        justify-content: space-around;
        width: 80px;
        border-left: 1px solid #eee;
      }
    }

    .controls-body {
      margin-top: 10px;
      height: 300px;
      overflow-y: auto;

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
        width: 550px;
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
      outline: none;
    }
  }
}
</style>