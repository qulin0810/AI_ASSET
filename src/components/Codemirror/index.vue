<template>
  <div>
    <div style="width: 800px; margin: auto">
      <div style="width: 800px; line-height: 24px; font-size: 24px; color: #777; margin-top: 20px">文本对比</div>
      <div style="width: 800px; display: flex; flex-direction: row; margin-top: 20px">
        <v-input v-model="origText" :rows="9" type="textarea" placeholder="请输入要对比的文本一" style="width: 330px" />
        <!-- <div style="width:140px;display:flex;flex-direction:column;text-align: center;">
        <v-btn type="primary" @click="initDiff" style="width:120px;margin-left:10px;margin-top:10px;">比较</v-btn>
      </div> -->
        <v-input v-model="newText" :rows="9" type="textarea" placeholder="请输入要对比的文本二" style="width: 330px" />
      </div>
      <div id="view" class="code-contrast"></div>
    </div>
  </div>
</template>
<script>
import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/addon/merge/merge.js"
import "codemirror/addon/merge/merge.css"
import DiffMatchPatch from "diff-match-patch"
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0
import { onMounted, ref } from "vue"
export default {
  name: "TextDiff",
  setup() {
    const origText = ref("你说")
    const newText = ref("我不说")
    onMounted(() => {
      initDiff()
    })
    const initDiff = () => {
      let target = document.getElementById("view")
      target.innerHTML = ""
      CodeMirror.MergeView(target, {
        value: origText.value, //上次内容
        origLeft: null,
        orig: newText.value, //本次内容
        lineNumbers: true, //显示行号
        mode: "text/html",
        highlightDifferences: true, //高亮
        connect: "align",
        readOnly: true //只读 不可修改
      })
    }
    return {
      origText,
      newText,
      initDiff
    }
  }
}
</script>

<style lang="scss">
.code-contrast {
  margin-top: 20px;
  width: 800px;
  text-align: left;
  .CodeMirror-merge-copy,
  .CodeMirror-merge-scrolllock-wrap {
    display: none !important;
  }
}
.CodeMirror-merge-copybuttons-right {
  width: 0px;
  display: none;
}
</style>
