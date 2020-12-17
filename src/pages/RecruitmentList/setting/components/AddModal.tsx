import React, { useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';

import { connect, Dispatch } from 'umi'

import { RecruitmentSettingState } from '../data'

interface AddModalProps {
  modalVisible: boolean;
  departmentList: any
  positionList: any
  onCancel: () => void;
  dispatch: Dispatch
  afterClose: () => void
}

const { Option } = Select

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}

const AddModal: React.FC<AddModalProps> = (props) => {
  
  const { modalVisible, departmentList, positionList, onCancel, dispatch, afterClose } = props
  const button = useRef<HTMLFontElement>(null)

  const onFinish = (e: any) => {
    const data = {
      department: e.department,
      position: e.position,
      request: e.requirements,
      number: e.count
    }

    dispatch({
      type: 'recruitmentSetting/create',
      payload: data
    })

    onCancel()

    setTimeout(() => {
      afterClose()
    }, 0.5 * 1000)

  }

  return (
    <Modal
      destroyOnClose
      title="新增部门"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={() => button.current?.click()}
      okText="确定"
      cancelText="取消"
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        onFinish={onFinish}
        hideRequiredMark
        autoComplete={'off'}
      >
        <FormItem
          name="department"
          label="部门"
          rules={[{ required: true, message: '请输入部门' }]}
        >
          <Select showSearch placeholder={'请选择部门'} >
            {getOption(departmentList)}
          </Select>
        </FormItem>
        <FormItem
          name="position"
          label="职务"
          rules={[{ required: true, message: '请输入职务' }]}
        >
          <Select showSearch placeholder={'请选择职务'} >
            {getOption(positionList)}
          </Select>
        </FormItem>
        <FormItem
          name="requirements"
          label="招新要求"
          rules={[{ required: true, message: '请输入招新要求' }]}
        >
          <TextArea showCount maxLength={100} rows={3} placeholder={'请输入...'} />
        </FormItem>
        <FormItem
          name="count"
          label="招新人数"
          rules={[{ required: true, message: '请输入招新人数' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{ color: '#bfbfbf' }}>人</div>} />
        </FormItem>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" id="add-submit" ref={button} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  ({recruitmentSetting}: {recruitmentSetting: RecruitmentSettingState}) => ({
    departmentList: recruitmentSetting.department,
    positionList: recruitmentSetting.position
  })
)(AddModal)
