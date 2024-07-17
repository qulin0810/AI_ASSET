<template>
  <div style="border: 1px solid #ccc">
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

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
// import { DomEditor } from "@wangeditor/editor";

export default {
  components: { Editor, Toolbar },
  props: {
    dataInfo: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const editorRef = shallowRef()
    const valueHtml = ref("<p></p>")
    const mode = ref("simple") //简洁

    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = props.dataInfo || "" //回显数据
      }, 50)
    })

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
            const fileBase64 = await fileToBase64Async(file)
            insertFn(fileBase64) // 最后插入图片 insertFn(url, alt, href)，alt：描述，href:链接，后面非必填
            console.log(fileBase64)
          }
        }
      }
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      if (!editorRef.value) return
      editorRef.value.destroy()
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
        reader.onerror = (error) => {
          reject(error)
        }
      })
    }

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const contentChange = (editor: any) => {
      context.emit("change", editor.getHtml())
    }

    return {
      editorRef,
      valueHtml,
      mode,
      toolbarConfig,
      editorConfig,
      handleCreated,
      fileToBase64Async,
      contentChange
    }
  }
}
</script>
