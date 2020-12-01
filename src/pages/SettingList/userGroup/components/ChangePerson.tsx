import React, { useState } from 'react';
import { Modal } from 'antd';

import { TableListItem } from '../data';
import SearchTransfer from './SearchTransfer'

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  // onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}


export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}



const ChangePerson: React.FC<UpdateFormProps> = (props) => {


  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
  } = props;


  return (
    <Modal
      width={1000}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="人员配置"
      visible={updateModalVisible}
      // footer={}
      onCancel={() => handleUpdateModalVisible()}
    >
      {<SearchTransfer />}
    </Modal>
  );
};

export default ChangePerson;
