<script lang="ts" setup>
import { onMounted, ref, defineProps } from "vue"
import WangEditor from "@/components/WangEditor/index.vue"
import { cloneDeep } from "lodash-es"
import { type CreateOrUpdateTableRequestData } from "@/api/contract/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { getContractDetail, getSceneList } from "@/api/contract"
const DEFAULT_FORM_DATA = {
  id: undefined,
  // username: "",
  password: "",
  contract_name: ""
}
const selectOption = ref({})
const contractContent = ref("")
const loading = ref<boolean>(false)
const props = defineProps({
  data: String
})
// const prop = defineProps < Props > ()
const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
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
  contractContent.value = props.data || ""
  querySelect()
})
// onMounted(() => {

//   })
async function querySelect() {
  try {
    const res = await getSceneList()
    if (res.code === 0) {
      let result = res.data
      selectOption.value = result?.map((item: any) => ({
        value: item.id,
        label: item.id
      }))
    } else {
      ElMessage.error(res.error_msg)
    }
  } catch (error: any) {
    ElMessage.error(error)
  }
}
async function handleCreateOrUpdate() {}
</script>

<template>
  <!-- <WangEditor /> -->
  <el-row>
    <el-col :span="11">
      <div class="grid-content ep-bg-purple" />
      <WangEditor :dataInfo="contractContent" />
      <div style="margin-top: 2rem">
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">新建版本</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">保存</el-button>
      </div>
    </el-col>
    <el-col :span="1"> </el-col>
    <el-col :span="11">
      <div class="grid-content ep-bg-purple-light" />
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item label="选择场景" prop="count">
          <el-select v-model="value" clearable placeholder="Select" style="width: 30rem">
            <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="提交区">
          <el-input v-model="formData.username" placeholder="请输入" type="textarea" style="width: 30rem" :rows="11" />
        </el-form-item>
        <el-form-item prop="password" label="回显区">
          <el-input v-model="formData.password" placeholder="请输入" type="textarea" style="width: 30rem" :rows="11" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
    </el-col>
  </el-row>
</template>
