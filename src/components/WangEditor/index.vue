<template>
  <div class="editor">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="contentChange"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup name="WangEditor" lang="ts">
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { DomEditor } from "@wangeditor/editor"

const props = defineProps<{
  data?: string //text:用于做数据回显功能
}>()

const emits = defineEmits<{
  (e: "change", data: any): void //主要用于父组件接收wangeditor实时编辑的内容
}>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref("")

// 工具栏模式
const mode = ref("simple") //简洁

onMounted(() => {
  setTimeout(() => {
    valueHtml.value = props.data ?? "" //回显数据
    // const toolbar = DomEditor.getToolbar(editorRef.value) as any;
    // const curToolbarConfig = toolbar.getConfig();
    // console.log(curToolbarConfig.toolbarKeys);  //这里会打印出所有的key
  }, 200)
})

/**
 * file 转Base64 DataURL
 * @param {File} file
 * @returns
 */
const fileToBase64Async = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: any) => {
      resolve(e.target.result)
    }
  })
}
// [
//     "blockquote",
//     "header1",
//     "header2",
//     "header3",
//     "|",
//     "bold",
//     "underline",
//     "italic",
//     "through",
//     "color",
//     "bgColor",
//     "clearStyle",
//     "|",
//     "bulletedList",
//     "numberedList",
//     "todo",
//     "justifyLeft",
//     "justifyRight",
//     "justifyCenter",
//     "|",
//     "insertLink",
//     {
//         "key": "group-image",
//         "title": "图片",
//         "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
//         "menuKeys": [
//             "insertImage",
//             "uploadImage"
//         ]
//     },
//     "insertVideo",
//     "insertTable",
//     "codeBlock",
//     "|",
//     "undo",
//     "redo",
//     "|",
//     "fullScreen"
// ]

// 工具栏配置项
const toolbarConfig = {
  excludeKeys: ["insertLink", "viewImageLink", "insertVideo", "emotion", "fullScreen", "todo"] //排除不需要的菜单
}

// 编辑器配置项
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: any) {
        const fileBase64 = fileToBase64Async(file)
        insertFn(fileBase64) // 最后插入图片 insertFn(url, alt, href)，alt：描述，href:链接，后面非必填
        console.log(fileBase64)
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (editorRef.value == null) return
  editorRef.value.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const contentChange = (editor: any) => {
  emits("change", editor.getHtml())
}
</script>

<style lang="scss">
.editor {
  width: 100%;
  border: 1px solid #ccc;
  //修改工具栏的背景色
  .w-e-bar {
    background: var(--w-e-bar-bg-color);
  }
}

// // 去除内置样式
// .w-e-text-container blockquote, .w-e-text-container li,
// .w-e-text-container p,
// .w-e-text-container td,
// .w-e-text-container th,
// .w-e-toolbar *{
//     line-height: unset !important;
// }
</style>
