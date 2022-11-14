<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      style="height: 400px; overflow-y: hidden;"
      :class="readonly ? 'wang_editor' : ''"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @customUpload="onCustomUpload"
      @onBlur="handleBlur"
      ref="wangeditorRef"
    />
  </div>
</template> 
<script>
export default {
  name: 'WEditor'
}
</script>
<!-- 使用了setup语法糖 -->
<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick, watch} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { createEditor, DomEditor } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css 

const props = defineProps({
  htmls: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  readonly: { // 是否可输入
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'blur'])
watch(() => props.value, value => {
  valueHtml.value = value  
})
// 编辑器实例，必须用 shallowRef 
const editorRef = shallowRef()
// 内容 HTML 
const valueHtml = ref('')
// 配置内容 
const mode = ref('simple') // 'default' 或者 'simple' 
const toolbarConfig = {
   insertKeys:{
    index:5,
     keys: ['emotion']
    }, 
  excludeKeys: ['insertVideo', 'insertTable', 'fullScreen', 'undo', 'redo', 'todo',
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'through',  // 删除线
    'blockquote',  // 引用
    'codeBlock',
    'bulletedList',
    'justifyLeft',
    'numberedList',
    'justifyRight',
    'justifyCenter'
    ],
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {}
}
// 使用editorCongfig.MENU_CONF[属性名]，可以自定义属性值配置
editorConfig.MENU_CONF['uploadImage'] = {
  base64LimitSize: 5 * 1024 * 1024, 
  // // 图片小于5M时自动转Base64格式
}
editorConfig.MENU_CONF['emotion'] = {
    emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ') // 数组
}
const handleBlur = () => {
  emit('blur')
}
const onCustomUpload = () => {
}
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor实例，重要！ 
  if (props.readonly) {
    editorRef.value.disable()
  }
}
// 组件销毁时，也及时销毁编辑器 
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
watch(valueHtml, (n) => {
  emit('update:value', n)
})
</script> 
