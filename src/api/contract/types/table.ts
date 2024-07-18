export interface CreateOrUpdateTableRequestData {
  template_id: undefined
  contract_name?: ""
}
export interface ContractOption {
  key?: string
  value?: string
}
export interface GetTableRequestData {
  /** 当前页码 */
  page_no: number
  /** 查询条数 */
  page_size: number
  /** 查询参数：用户名 */
  contract_name?: string
  type_filter?: string
}

export interface GetTableData {
  // createTime: string
  description: string
  id: string
  file_id: string
  // roles: string
  status: boolean
  contract_name: string
  edition_name: string
  status_str: string
  history: []
}

export type GetTableResponseData = ApiResponseData<{
  items: GetTableData[]
  total: number
}>

export interface SceneData {
  id: string
}

export type SceneResponseData = ApiResponseData<[]>
