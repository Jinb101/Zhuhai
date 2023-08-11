import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 项目维护管理
  fl_project_save = '/v1/fl_project', // add/list
  fl_project_update = '/v1/fl_project/update', // update
  fl_project_list = '/v1/fl_project', // add/list
  // 工作量填报管理
  fl_project_workload_add_list = '/v1/fl_project_workload', // add/list
  fl_project_workload_detail = '/v1/fl_project_workload/', // detail
}

// 项目维护管理
/**
 * 新增/修改
 * @param params
 */
export const saveOrUpdateProjectApi = (params, isUpdate) => {
  const url = isUpdate ? Api.fl_project_update : Api.fl_project_save;
  return defHttp.post({ url: url, params });
};

/**
 * 列表
 */
export const listProjectApi = (params) => {
  return defHttp.get({ url: Api.fl_project_list, params });
};

// 工作量填报管理
/**
 * 新增
 * @param params
 */
export const addWorkloadApi = (params) => {
  return defHttp.post({ url: Api.fl_project_workload_add_list, params });
};

/**
 * 详情
 */
export const detailWorkloadApi = (params) => {
  return defHttp.get({ url: Api.fl_project_workload_detail, params }, { joinParamsToUrl: true });
};

/**
 * 列表
 */
export const listWorkloadApi = (params) => {
  return defHttp.get({ url: Api.fl_project_workload_add_list, params });
};
