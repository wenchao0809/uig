/**
 * 版本列表
 
 
 * @typedef editionListRsp
 * @property {string} test1 - 测试简介1
 * @property {string} test2 - 测试简介2
 * @property {string} test3 - 测试简介2

 * @returns {Promise<editionListRsp>}
 */
export function editionList(data) {
  return axios.get('/edition/list', data);
}
