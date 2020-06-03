/**
 * 应用列表
 
 * @param {number} object.status - 应用状态
 * @param {string} object.type - 应用类型
 * @param {object} sfsaf - 测试对象参数
 * 
 * @param {string} object.sfsaf.status - 测试对象参数属性 - 测试对象参数
 * 
 * @typedef testDataArrayType
 * @property {string} test1 - 

 *@param {testDataArrayType[]} testDataArray - 
 
 * @typedef appListRsp
 * @property {number} code - 
 * @property {string} message - 
 * @property {object} data - 
 * 
 * 
 * @typedef appListType

 *@property {appListType[]} appList -  - 
 * @property {string} appName - 
 * @property {number} appVersion - 

 * @returns {Promise<appListRsp>}
 */
export function appList(data) {
  return axios.post('/app/list', data);
}
