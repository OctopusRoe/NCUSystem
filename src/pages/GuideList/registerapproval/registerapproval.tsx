import { Button, Checkbox,Form, Input, message, Modal, Radio, Space } from 'antd';

// 审批页面

import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { MinusCircleOutlined, PlusOutlined, ToolOutlined } from '@ant-design/icons';


const RegisterApproval: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false)
  const [rulevisible, setRulevisible] = useState(false)
  const [checkValue, setcheckValue] = useState({})
  const [reasondisplay, setReasondisplay] = useState('none')
  const [radiovalue, setRadiovalue] = useState(1)
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '申请编号',
      dataIndex: 'number',
      width: 120,
      key: 'number',
      fixed: 'left',
      sorter: true,
    },
    {
      title: '社团中文全称',
      dataIndex: 'chinesename',
      width: 150,
      key: 'chinesename',
      fixed: 'left',
    },
    {
      title: '社团英文全称',
      dataIndex: 'englishname',
      width: 200,
      key: 'englishname',
    },
    {
      title: '社团类别',
      dataIndex: 'category',
      width: 100,
      key: 'category',
    },
    {
      title: '社团等级',
      dataIndex: 'level',
      width: 100,
      key: 'level',
      sorter: true,
    },
    {
      title: '业务指导单位',
      dataIndex: 'unit',
      width: 120,
      key: 'unit',
    },
    {
      title: '社团成员数',
      dataIndex: 'count',
      width: 120,
      key: 'count',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '社团章程',
      dataIndex: 'constitution',
      width: 120,
      key: 'constitution',
    },
    {
      title: '发起人',
      dataIndex: 'initiator',
      width: 100,
      key: 'initiator',
    },
    {
      title: '申请时间',
      dataIndex: 'time',
      width: 150,
      key: 'time',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '指导老师',
      dataIndex: 'teacher',
      width: 100,
      key: 'teacher',
    },
    {
      title: '申请材料',
      dataIndex: 'materials',
      width: 150,
      key: 'materials',
      hideInSearch: true,
    },
    {
      title: '部门审批人',
      dataIndex: 'departmentInitiator',
      width: 100,
      key: 'departmentInitiator',
    },
    {
      title: '部门审批时间',
      dataIndex: 'departmentTime',
      width: 150,
      key: 'departmentTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '学校审批人',
      dataIndex: 'schoolInitiator',
      width: 100,
      key: 'schoolInitiator',
    },
    {
      title: '学校审批时间',
      dataIndex: 'schoolTime',
      width: 150,
      key: 'schoolTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 170,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a onClick={() => {
            setVisible(true)
          }}>
            部门审批
          </a> &nbsp;&nbsp;
          <a onClick={() => {
            setVisible(true)
          }}>学校审批</a>
        </>
      ),
    },
  ];

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const radioOnchange = (e: any) => {
    setRadiovalue(e.target.value)
    if (e.target.value === 1) {
      setReasondisplay('none')
    }
    else if (e.target.value === 2) {
      setReasondisplay('')
    }
  }

  const onOk = () => {
    console.log(checkValue)
    if (checkValue =={}) {

      message.warning('请选择拒绝理由');
    }
    else {
      console.log(2)
      setVisible(false)
    }
  }

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setRulevisible(true)} size={'small'}>
            <ToolOutlined />  设置
          </Button>
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        scroll={{ x: 1500 }}
      />
      <Modal
        destroyOnClose
        title="审批"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onOk}
      >
        <div>
          <Form
            {...layout}
            name="basic"
          >
            <Form.Item
              label="请选择"
              name="examination"
              rules={[{ required: true, }]}
            >
              <Radio.Group onChange={radioOnchange} defaultValue={radiovalue}>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>拒绝</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="拒绝理由"
              name="reason"
              style={{ display: reasondisplay }}
              rules={[{ required: true, message: '请选择拒绝理由' }]}
            >
              <Checkbox.Group
                style={{ width: '100%' }}
                onChange={(value) => { setcheckValue(value) }}
              >
                <Checkbox value="A" style={{ lineHeight: '32px' }}>Awqeqeweqeq</Checkbox>
                <br />
                <Checkbox value="B" style={{ lineHeight: '32px' }}>B</Checkbox>
                <br />
                <Checkbox value="C" style={{ lineHeight: '32px' }}>C</Checkbox>
                <br />
                <Checkbox value="D" style={{ lineHeight: '32px' }}>D</Checkbox>
                <br />
                <Checkbox value="E" style={{ lineHeight: '32px' }}>E</Checkbox>
              </Checkbox.Group>
            </Form.Item>

          </Form>
        </div>
      </Modal>
      <Modal
        destroyOnClose
        title="添加"
        visible={rulevisible}
        onCancel={() => setRulevisible(false)}
        onOk={() => { setRulevisible(false) }}
      >
        <Form
          {...layout}
          name="basic"
        >
          <Form.Item
            label="添加理由"
            name="examination"
            rules={[{ required: true, }]}
          >
            <Form.List name="teacher">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map(field => (
                      <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                        <Form.Item
                          {...field}
                          name={[field.name, 'first']}
                          fieldKey={[field.fieldKey, 'first']}
                          rules={[{ required: true, }]}
                        >
                          <Input placeholder="" style={{ width: '314px' }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> 点击添加
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterApproval;
