// import { defHttp } from '/@/utils/http/axios';

// enum Api {
//   // 气站到货验收管理

// }

// // 气站到货验收管理
// /**
//  * 新增
//  * @param params
//  */
// export const addGasStationApi = (params) => {
//   return defHttp.post({ url: Api.fl_acceptance_add_list, params });
// };
// /**
//  * 修改
//  * @param params
//  */
// export const updateGasStationApi = (params) => {
//   return defHttp.post({ url: Api.fl_acceptance_update, params });
// };
// /**
//  * 删除
//  */
// export const deleteGasStationApi = (params) => {
//   return defHttp.post({ url: Api.fl_acceptance_delete, params });
// };

// /**
//  * 详情
//  */
// export const detailGasStationApi = (params) => {
//   return defHttp.get({ url: Api.fl_acceptance_detail, params }, { joinParamsToUrl: true });
// };

// /**
//  * 列表
//  */
// export const listGasStationApi = (params) => {
//   return defHttp.get({ url: Api.fl_acceptance_add_list, params });
// };

// // 供货商管理
// /**
//  * 列表
//  * @param params (pageNumber: number, pageSize: number)
//  */
// export const listSupplierApi = (pageNumber: number, pageSize: number) => {
//   return defHttp.get({ url: Api.fl_supplier_list, params: { pageNumber, pageSize } });
// };
// // SupplierApi;

// // 地磅检测管理
// /**
//  * 新增
//  * @param params (pageNumber: number, pageSize: number)
//  */
// export const addDetectionApi = (params) => {
//   return defHttp.post({ url: Api.fl_detection_list, params });
// };

// /**
//  * 列表
//  * @param params (pageNumber: number, pageSize: number)
//  */
// export const listDetectionApi = (pageNumber: number, pageSize: number) => {
//   return defHttp.get({ url: Api.fl_detection_list, params: { pageNumber, pageSize } });
// };
