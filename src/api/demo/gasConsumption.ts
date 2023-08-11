import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 气体消耗监测
  gas_mo_list = ' /deiviceInfo/pageList',
}

//
/**
//  * 新增
//  * @param params
//  */
// export const addGasStationApi = (params) => {
//   return defHttp.post({ url: Api.fl_acceptance_add_list, params });
// };

/**
 * 监测设备查询 列表
 * @param params (pageNumber: number, pageSize: number)
 */
export const listGasApi = (pageNumber: number, pageSize: number) => {
  return defHttp.get({ url: Api.gas_mo_list, params: { pageNumber, pageSize } });
};
