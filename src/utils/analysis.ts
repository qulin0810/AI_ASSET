import mammoth from "mammoth"
export const analysisWord = async (file: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (evt) => {
      mammoth.convertToHtml({ arrayBuffer: evt?.target?.result }).then((resultObject) => {
        resolve(resultObject.value)
      })
    }
    reader.readAsArrayBuffer(file)
  })
}
