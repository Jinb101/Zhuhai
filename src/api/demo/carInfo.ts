import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 车辆信息的维护
  fl_car_add_list = '/v1/fl_car', // add/list
  fl_car_update = '/v1/fl_car/update', // update
  fl_car_delete = '/v1/fl_car/delete', // delete
  fl_car_detail = '/v1/fl_car/', // detail
}

/**
 * 新增
 * @param params
 */
export const addCarApi = (params) => defHttp.post({ url: Api.fl_car_add_list, params });

/**
 * 修改
 * @param params
 */
export const updateCarApi = (params) => defHttp.post({ url: Api.fl_car_update, params });

/**
 * 删除
 */
export const deleteCarApi = (params) => {
  return defHttp.post({ url: Api.fl_car_delete, params });
};

/**
 * 详情
 */
export const detailCarApi = (params) => {
  return defHttp.get({ url: Api.fl_car_detail, params }, { joinParamsToUrl: true });
};

/**
 * 列表
 * @param params （value 0气罐1气瓶 businessId 采购id）
 */
export const listCarApi = (params) => {
  return defHttp.get({ url: Api.fl_car_add_list, params });
};
