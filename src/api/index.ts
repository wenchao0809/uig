interface Api {
  version: {
    /**版本列表 */
    editionList: (data: {}) => Promise<{ test1: string, test2?: string, test3?: string }>,
  };
  app: {
    /**应用列表 */
    appList: (data: {
      status: number,
      type: string,
      sfsaf?: object,
      status?: string,
      testDataArray?: array,
      test1: string,
    }) => Promise<{
      code: number,
      message: string,
      data: object,
      appList: array,
      appName: string,
      appVersion?: number,
    }>,
  };
}

let api: Api;

api = {
  version: {
    editionList(data) {
      return axios.get('/edition/list', data);
    },
  },
  app: {
    appList(data) {
      return axios.post('/app/list', data);
    },
  },
};

export default api;
