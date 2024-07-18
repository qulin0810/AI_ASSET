import { request } from "@/utils/service"
import type * as Table from "./types/table"

/** 增 */
export function createTableDataApi(data: Table.CreateOrUpdateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: Table.CreateOrUpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 合同列表*/
export function getTableDataApi(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/contract/list",
    method: "post",
    params
  })
}

/**模板浏览*/
export function getContractContent(id: string) {
  return request({
    url: `/file/download/stream/${id}`,
    method: "get",
    responseType: "blob"
  })
}
/**获取合同信息*/
export function getContractDetail(template_id: string) {
  return request({
    url: `/template/view/${template_id}`,
    method: "get"
  })
}
/** 获取场景*/
export function getSceneList() {
  return request<Table.SceneResponseData>({
    url: "/ai/scene/list",
    method: "post"
  })
}
