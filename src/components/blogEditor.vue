<template>
  <div style="border: 1px solid #ccc">
    <Editor
      style="height: 8rem; overflow-y: hidden;"
      :class="readonly ? 'wang_editor' : ''"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @customUpload="onCustomUpload"
      @onBlur="handleBlur"
      ref="wangeditorRef"
    />
   <Toolbar style="border-top: 1px solid #3F51B5;" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
  </div>
</template> 
<script>
export default {
  name: 'WEditor'
}
</script>
<!-- 使用了setup语法糖 -->
<script setup>
import {onBeforeUnmount, ref, shallowRef, onMounted, nextTick, watch} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {createEditor, DomEditor,Boot } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css 
import { ElMessage } from 'element-plus'
const props = defineProps({
  htmls: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  readonly: { 
    // 是否可输入
    type: Boolean,
    default: false
  },
  // 清空富文本编辑器
  resetText:{
    type:Boolean,
    default:false
  }
})
// 监听props中的resetText 
watch(
  () => props.resetText,
  (newVal, oldVal) => {
   if(newVal===true){
     console.log('监听到了reset');
     valueHtml.value=''
     // eslint-disable-next-line vue/no-mutating-props
     props.resetText=false
   }
  }
)

class MyButtonMenu {                       // JS 语法

    constructor() {
        this.title = '标签' // 自定义菜单标题
        this.iconSvg = '<svg><svg t="1668562998616" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1432" width="200" height="200"><path d="M931.479305 1023.72653a44.607686 44.607686 0 0 1-26.473404-8.47149L511.611119 730.930682 118.216336 1015.122673a44.740053 44.740053 0 0 1-46.857924 4.103378A45.137154 45.137154 0 0 1 47.135247 979.515945V45.004787A45.004787 45.004787 0 0 1 92.140034 0h839.471638a45.004787 45.004787 0 0 1 45.004787 45.004787v933.716956a45.269521 45.269521 0 0 1-45.137154 45.004787z" fill="#4D4D4D" p-id="1433"></path><path d="M277.850962 223.83263a38.783537 38.783537 0 0 0 38.783537 38.65117h390.482708a38.783537 38.783537 0 0 0 0-77.434707h-390.482708a38.783537 38.783537 0 0 0-38.783537 38.783537zM277.850962 472.55026a38.783537 38.783537 0 0 0 38.783537 38.783537h390.482708a38.783537 38.783537 0 0 0 0-77.434707h-390.482708a38.783537 38.783537 0 0 0-38.783537 38.65117z" fill="#FFFFFF" p-id="1434"></path></svg></svg>' // 可选
        this.tag = 'button'
        this.isShowTag=false
    }
    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
        isActive(editor) {                      // JS 语法
        return false
    }
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false

     getValue(editor) {                              // JS 语法
        return ' hello '
    }
    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数

       exec(editor, value) {                              // JS 语法
        if (this.isDisabled(editor)) return
        // editor.insertText(value)
        // value 即 this.value(editor) 的返回值
        // 采用事件监听实现父子组件通信
           this.isShowTag=!this.isShowTag
       
           emit('showTag',this.isShowTag)

    }

}
 class MyPictureMenu {                           // JS 语法
    constructor() {
        this.title = '图片'
         this.iconSvg = '<svg t="1668753458165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2709" width="200" height="200"><path d="M854.2208 110.7968 164.1472 110.7968c-72.4992 0-131.1744 58.7776-131.1744 131.1744l0 506.7776c0 72.4992 58.7776 131.1744 131.1744 131.1744l690.0736 0c72.4992 0 131.1744-58.7776 131.1744-131.1744L985.3952 241.9712C985.3952 169.5744 926.72 110.7968 854.2208 110.7968zM301.6704 278.9376c36.864 0 66.7648 29.9008 66.7648 66.7648s-29.9008 66.7648-66.7648 66.7648-66.7648-29.9008-66.7648-66.7648S264.8064 278.9376 301.6704 278.9376zM919.2448 638.1568c-8.6016 6.656-20.992 4.9152-27.5456-3.6864L744.5504 440.1152c-0.4096-0.6144-41.472-53.248-91.3408-48.2304-40.5504 4.608-80.384 47.8208-115.2 125.0304-36.864 82.0224-73.0112 124.8256-113.664 134.8608-46.08 11.1616-85.8112-20.0704-127.8976-53.3504l-5.3248-4.1984c-49.2544-38.6048-72.8064-29.7984-167.6288 63.0784-3.7888 3.7888-8.8064 5.632-13.7216 5.632-5.12 0-10.24-1.9456-14.0288-5.9392-7.5776-7.7824-7.4752-20.2752 0.3072-27.8528C182.1696 544.768 234.8032 500.0192 315.392 563.3024l5.4272 4.1984c35.9424 28.3648 66.9696 52.8384 94.208 46.08 27.136-6.656 56.4224-44.544 87.1424-112.7424 41.472-92.0576 90.8288-141.9264 146.944-148.0704 72.192-7.68 124.7232 60.7232 126.8736 63.6928l146.944 194.1504C929.4848 619.3152 927.8464 631.6032 919.2448 638.1568z" p-id="2710"></path></svg>'
        this.tag = 'button'
        this.isShowPicture=false
        // this.showDropPanel = true
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
        isActive(editor) {                      // JS 语法
        return false
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
     getValue(editor) {                               // JS 语法
        return ''
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
        exec(editor, value) {                              // JS 语法
       this.isShowPicture=!this.isShowPicture       
       emit('showPicture',this.isShowPicture)
    }


}

// 注册自定义功能
const menu1Conf = {
  key: 'menu1', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new MyButtonMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}
const menu2Conf = {
  key: 'menu2', 
  factory() {
    return new MyPictureMenu() 
  },
}

Boot.registerMenu(menu1Conf)
Boot.registerMenu(menu2Conf)
const emit = defineEmits(['updatevalue', 'blur'],['showTag','blur'],['showPicture','blur'])
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
     keys: ['emotion','menu1','menu2']
    }, 
  excludeKeys: ['insertVideo', 'insertTable', 'fullScreen',
    'header1',
    'undo',  
    'redo', 
    'todo',
     'bold',  // 粗体
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'through',  // 删除线
    // 'blockquote',  // 引用
    'codeBlock',
    'bulletedList',
    // 'justifyLeft',
    'numberedList',
     'justifyRight',
    // 'justifyCenter',
    'clearStyle',
    'header2',
    'header3',
    'color',
    'insertLink',
    'group-image'
    ],
}
const editorConfig = {
  placeholder: '有什么新鲜事想分享给大家',
  MENU_CONF: {}
}
// 定义表情工具
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
watch(valueHtml, (html) => {
  // console.log(valueHtml);
  emit('updatevalue', html)
})
</script> 
