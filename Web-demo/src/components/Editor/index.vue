<template>
    <div>
      <!-- 此处注意写法v-model:content -->
      <QuillEditor ref="myQuillEditor" theme="snow" v-model:content="content" :options="data.editorOption"
        contentType="html" @update:content="setValue()" />
      <!-- 使用自定义图片上传 -->
      <input type="file" hidden accept=".jpg,.png" ref="fileBtn" @change="handleUpload" />
    </div>
  </template>
  
  <script setup>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import { reactive, onMounted, ref, toRaw, watch } from 'vue'
  
  const props = defineProps(['value'])
  const emit = defineEmits(['updateValue'])
  const content = ref('')
  const myQuillEditor = ref()
  // 通过watch监听回显，笔者这边使用v-model:content 不能正常回显
  watch(() => props.value, (val) => {
    toRaw(myQuillEditor.value).setHTML(val)
  }, { deep: true })
  const fileBtn = ref()
  const data = reactive({
    content: '',
    editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'header': 1 }, { 'header': 2 }],
          ['image'],
          [{ 'direction': 'rtl' }],
          [{ 'color': [] }, { 'background': [] }]
        ]
      },
      placeholder: '请输入内容...'
    }
  })
  const imgHandler = (state) => {
    if (state) {
      fileBtn.value.click()
    }
  }
  // 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
  const setValue = () => {
    const text = toRaw(myQuillEditor.value).getHTML()
  }
  const handleUpload = (e) => {
    const files = Array.prototype.slice.call(e.target.files)
    if (!files) {
      return
    }
    const formdata = new FormData()
    formdata.append('file', files[0])
    let url = `/api/prod-api/jc/files/upload`
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url)
    xhr.send(formdata)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 请求成功的回调函数
        var responseText = xhr.responseText;//返回结果
        var res = JSON.parse(responseText);
        const quill = toRaw(myQuillEditor.value).getQuill()
        const length = quill.getSelection().index
        quill.insertEmbed(length, 'image', res.data.url)
        quill.setSelection(length + 1)
      } else {
        // 请求失败的回调函数
      }
    }
  }
  // 初始化编辑器
  onMounted(() => {
    const quill = toRaw(myQuillEditor.value).getQuill()
    if (myQuillEditor.value) {
      quill.getModule('toolbar').addHandler('image', imgHandler)
    }
  })
  </script>
  <style scoped lang="scss">
  // 调整样式
  :deep(.ql-editor) {
    min-height: 180px;
  }
  
  :deep(.ql-formats) {
    height: 21px;
    line-height: 21px;
  }
  </style>
  
  