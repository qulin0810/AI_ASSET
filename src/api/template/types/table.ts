export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

export interface GetTableRequestData {
  /** 当前页码 */
  page_no: number
  /** 查询条数 */
  page_size: number
  /** 查询参数：用户名 */
  template_name?: string
}

export interface GetTableData {
  // createTime: string
  description: string
  id: string
  file_id: string
  // roles: string
  status: boolean
  template_name: string
}

export type GetTableResponseData = ApiResponseData<{
  items: GetTableData[]
  total: number
}>
