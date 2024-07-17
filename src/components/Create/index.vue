<script lang="ts" setup>
import {
  //   onMounted,
  //   reactive,
  ref
  //   watch
} from "vue"
import WangEditor from "@/components/WangEditor/index.vue"
import { cloneDeep } from "lodash-es"
import {
  type CreateOrUpdateTableRequestData
  // type GetTableData
} from "@/api/contract/types/table"
// interface Props {
//   // obj: Object
// }
const DEFAULT_FORM_DATA = {
  id: undefined,
  // username: "",
  password: "",
  contract_name: ""
}
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
</script>

<template>
  <!-- <WangEditor /> -->
  <el-row>
    <el-col :span="11">
      <div class="grid-content ep-bg-purple" />
      <div class="grid-content ep-bg-purple-light" />
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item label="选择模板" prop="count">
          <el-select v-model="value" clearable placeholder="Select" style="width: 30rem">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button style="margin-left: 2rem" type="primary">浏览</el-button>
        </el-form-item>
        <el-form-item prop="username" label="合同名称">
          <el-input v-model="formData.username" placeholder="请输入" style="width: 30rem" />
        </el-form-item>
      </el-form>
      <el-form ref="formRef1" :model="formData" :rules="formRules" label-width="100px" label-position="top">
        <el-form-item label="选择模板" prop="count">
          <el-select v-model="value" clearable placeholder="Select" style="width: 20rem">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="合同名称">
          <el-input v-model="formData.username" placeholder="请输入" style="width: 20rem" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
    </el-col>
    <el-col :span="1"> </el-col>
    <el-col :span="11">
      <div class="grid-content ep-bg-purple" />
      <WangEditor />
      <!-- <div style="margin-top: 2rem">
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">新建版本</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">保存</el-button>
      </div> -->
    </el-col>
  </el-row>
</template>
