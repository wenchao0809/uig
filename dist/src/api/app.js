/**
 * @typedef appListType
 * @property {string} appName -
 * @property {number} appVersion -
 */

/**
 * @typedef appListRsp
 * @property {number} code -
 * @property {string} message -
 * @property {object} data -
 * @property {appListType[]}  data.appList -
 */

/**
 * @typedef testDataArrayType
 * @property {string} test1 -
 */

/**
 * 应用列表
 * @param {object} data
 
 * @param {number} data.status - 应用状态
 * @param {string} data.type - 应用类型
 * @param {object} data.sfsaf - 测试对象参数
 * @param {string} data.sfsaf.status - 测试对象参数属性
 * @param {testDataArrayType[]}  data.testDataArray - 
 * @returns {Promise<appListRsp>}
 */
export function appList(data) {
  return axios.post('/app/list', data);
}
