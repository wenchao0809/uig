/* md5: 331bea4675f9138d64dea4f693160fd0 */
/* Rap仓库id: 254918 */
/* Rapper版本: 1.0.3-beta.2 */
/* eslint-disable */
/* tslint:disable */

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=254918
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：editionList
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=254918&mod=382279&itf=1582917
   */
  'GET/edition/list': {
    Req: {}
    Res: {
      test1: string
      test2: string
      test3: string
    }
  }

  /**
   * 接口名：appList
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=254918&mod=385500&itf=1597586
   */
  'POST/app/list': {
    Req: {
      status: number
      type: number
      sfsaf?: string
    }
    Res: {
      appName: string
      appId: {
        test1: string
      }
      appVersion: string
      testArray: {
        ap: string
      }[]
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'GET/edition/list': ResSelector<IModels['GET/edition/list']['Res']>
  'POST/app/list': ResSelector<IModels['POST/app/list']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption) {
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：editionList
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=254918&mod=382279&itf=1582917
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/edition/list': (req?: IModels['GET/edition/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/edition/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/edition/list']>
    },

    /**
     * 接口名：appList
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=254918&mod=385500&itf=1597586
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/app/list': (req?: IModels['POST/app/list']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/app/list',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/app/list']>
    },
  }
}
