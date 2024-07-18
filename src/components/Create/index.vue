<script lang="ts" setup>
import {
  onMounted,
  reactive,
  ref
  //   watch
} from "vue"
import WangEditor from "@/components/WangEditor/index.vue"
import { cloneDeep } from "lodash-es"
import {
  type CreateOrUpdateTableRequestData,
  type ContractOption
  // type GetTableData
} from "@/api/contract/types/table"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getContractContent } from "@/api/contract"
import { getContractDetail, getSceneList } from "@/api/contract"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { getTableDataApi } from "@/api/template"
import mammoth from "mammoth"
// import analysisWord from "@/utils/analysis"
interface RuleForm {
  template_id: string
  contract_name: string
}
const formRules = reactive<RuleForm>({
  contract_name: "",
  template_id: ""
})
const loading = ref<boolean>(false)
const DEFAULT_FORM_DATA = {
  template_id: "",
  contract_name: ""
}
const DEFAULT_OPTION = [
  {
    value: "",
    label: ""
  }
]
// const ruleFormRef = ref<FormInstance>()
const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const selectOption = ref(DEFAULT_OPTION)
const contractContent = ref<string | null>(null)
const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
]
onMounted(() => {
  querySelect()
})
// 初始化模板下拉选
async function querySelect() {
  try {
    const res = await getTableDataApi({
      page_no: 1,
      page_size: 1000,
      template_name: undefined
    })
    if (res.code === 0) {
      let result = res.data
      selectOption.value = result?.items.map((item: any) => ({
        value: item.id,
        label: item.template_name
      }))
    } else {
      ElMessage.error(res.error_msg)
    }
  } catch (error: any) {
    ElMessage.error(error)
  }
}
// 浏览模板
const handleView = async (row: GetTableData) => {
  // getContractContent(row.id)
  try {
    const res = await getContractContent("13")
    debugger
    if (res?.type == "application/json") {
      const reader = new FileReader() as any //创建一个FileReader实例
      reader.readAsText(res, "utf-8") //读取文件,结果用字符串形式表示
      reader.onload = function () {
        const { error_msg } = JSON.parse(reader?.result)
        ElMessage.error(error_msg)
      }
    } else {
      const value: any = await analysisWord(res as Blob)
      contractContent.value = value
    }
  } catch (error) {
    contractContent.value = null
  } finally {
    loading.value = false
  }
}
const analysisWord = async (file: Blob) => {
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

async function handlDetail(e: any) {
  loading.value = true
  try {
    // let id: string = e.target.value
    const res = await getContractDetail(e)
    if (res) {
    }
    ElMessage.error(res.error_msg)
  } catch (error) {
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- <WangEditor /> -->
  <el-row>
    <el-col :span="11">
      <div class="grid-content ep-bg-purple" />
      <div class="grid-content ep-bg-purple-light" />
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item label="选择模板" prop="count">
          <el-select
            v-model="formData.template_id"
            clearable
            placeholder="Select"
            class="chooseBox"
            @change="handlDetail($event)"
          >
            <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button style="margin-left: 2rem" type="primary" @click="handleView()">浏览</el-button>
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input v-model="formData.contract_name" placeholder="请输入" class="chooseBox" />
        </el-form-item>
      </el-form>
      <el-form
        ref="formRef1"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        label-position="top"
        class="dataBox"
      >
        <el-form-item label="选择模板" prop="count">
          <el-select v-model="value" clearable placeholder="Select" class="chooseBox">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="合同名称">
          <el-input v-model="formData.username" placeholder="请输入" class="chooseBox" />
        </el-form-item>
        <el-form-item label="选择模板" prop="count">
          <el-select v-model="value" clearable placeholder="Select" class="chooseBox">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="合同名称">
          <el-input v-model="formData.username" placeholder="请输入" class="chooseBox" />
        </el-form-item>
        <el-form-item label="选择模板" prop="count">
          <el-select v-model="value" clearable placeholder="Select" class="chooseBox">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="合同名称">
          <el-input v-model="formData.username" placeholder="请输入" class="chooseBox" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
    </el-col>
    <el-col :span="1"> </el-col>
    <el-col :span="11">
      <div class="grid-content ep-bg-purple" />
      <WangEditor :dataInfo="contractContent" />
      <!-- <div style="margin-top: 2rem">
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">新建版本</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">保存</el-button>
      </div> -->
    </el-col>
  </el-row>
</template>
<style lang="css" scoped>
.chooseBox {
  width: 20rem;
}

.dataBox {
  height: 25rem;
  overflow-y: auto;
}
</style>
