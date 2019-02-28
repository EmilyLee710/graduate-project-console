import * as httpService from './Http'

import {
    BaseResponse,
    AdminAddSkuResponse,
    AdminGetSkuInfoResponse,
    AdminSearchSkuInfoResponse
  } from '../interfaces/Response'

import {
    AdminAddSkuRequest,
    AdminDeleteSkuRequest,
    AdminGetSkuInfoRequest,
    AdminSearchSkuInfoRequest,
    AdminSetSkuRequest
}   from '../interfaces/Request'

export function AdminAddSku(opt:AdminAddSkuRequest) {
      return httpService.post<AdminAddSkuResponse,AdminAddSkuRequest>('/api/sku/AdminAddSku', opt);
}

export function AdminDeleteSku(opt:AdminDeleteSkuRequest) {
    return httpService.post<BaseResponse,AdminDeleteSkuRequest>('/api/sku/AdminDeleteSku', opt);
}

export function AdminGetSkuInfoSku(opt:AdminGetSkuInfoRequest) {
    return httpService.post<AdminGetSkuInfoResponse,AdminGetSkuInfoRequest>('/api/sku/AdminGetSkuInfo', opt);
}

export function AdminSearchSkuInfo(opt:AdminSearchSkuInfoRequest) {
    return httpService.post<AdminSearchSkuInfoResponse,AdminSearchSkuInfoRequest>('/api/sku/AdminSearchSkuInfo', opt);
}

export function AdminSetSku(opt:AdminSetSkuRequest) {
    return httpService.post<BaseResponse,AdminSetSkuRequest>('/api/sku/AdminSetSku', opt);
}