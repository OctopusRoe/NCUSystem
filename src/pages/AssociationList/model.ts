// 社团管理的全局 model

import { Effect, Reducer } from 'umi'

import { AssociationState } from './data'

export interface AssociationType {
  namespace: string
  state: AssociationState
}

const associationModel: AssociationType = {
  namespace: 'associationControl',
  state: {
    associationId: '1'
  }
}

export default associationModel