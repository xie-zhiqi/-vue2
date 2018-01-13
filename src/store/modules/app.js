import qs from 'qs'

const state = {
  resError: '' // 错误数据
}

const getters = {
  getResError: state => state.resError
}

const mutations = {
  // 响应错误数据
  RES_ERROR: (state, data) => {
    // console.log(data)
    state.resError = data
      ? {
        status: data.status,
        statusText: data.statusText,
        statusCode: `${data.status} ${data.statusText}`,
        error: {
          'Response Data': data.data,
          'Request URL': data.config.url,
          'Request Method': data.config.method.toUpperCase(),
          'Form Data': qs.parse(data.config.data)
        }
      }
      : ''
  }
}

export default {state, getters, mutations}
