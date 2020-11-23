// base 组件的 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { baseInfoUpdata } from '../service'

export interface BaseViewState {

}

export interface BaseViewModelType {
  namespace: string
  state: BaseViewState
  reducers: {

  }
  effects: {
    putInfo: Effect
  }
}

const baseViewModel: BaseViewModelType = {
  namespace: 'baseViewModel',
  state: {},
  reducers: {

  },
  effects: {
    *putInfo({payload},{call, put}) {

      const formData = new FormData ()
      formData.append('SchoolName', payload.fullname)
      formData.append('SysName', payload.sysfullname)
      formData.append('SysShortName', payload.syssimplename)
      formData.append('CopyrightInfo', payload.copyright)
      formData.append('SchoolLogo', payload.logo.originFileObj)
      formData.append('Favicon', payload.favicon.originFileObj)
      formData.append('LoginBackground', payload.background.originFileObj)
      formData.append('SchoolName', payload.logo.originFileObj)
      formData.append('HelpDoc', payload.help.file.originFileObj)

      const back = yield call(baseInfoUpdata(formData))
      if (back.code !== 0) {
        message.error(back.message)
        return
      }
      message.success('保存成功')
    }
  }
}

export default baseViewModel