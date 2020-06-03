import { createFetch, defaultFetch } from './rapper/index'
import * as commonLib from 'rap/runtime/commonLib'
import axios = require('axios')
export default createFetch(async (d: commonLib.IUserFetchParams) : Promise<any> =>  {
  try {
    const response = await axios.default.request({
      method: d.method,
      url: d.url,
      data: d.params,
      baseURL: 'http://rap2.taobao.org:38080/app/mock/254918'
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
})