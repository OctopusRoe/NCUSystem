import { Button, Checkbox, Divider, Form, Input, message, Modal, Radio, Space } from 'antd';

// 审批页面

import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { MinusCircleOutlined, PlusOutlined, ToolOutlined } from '@ant-design/icons';
import Infomodal from '@/components/InfoModal/Infomodal';

const RegisterApproval: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [rulevisible, setRulevisible] = useState(false);
  const [checkValue, setcheckValue] = useState({});
  const [infomodalVisible, setinfomodalVisible] = useState(false);
  const [reasondisplay, setReasondisplay] = useState('none');
  const [radiovalue, setRadiovalue] = useState(1);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '注册编号',
      dataIndex: 'number',
      // width: 120,
      key: 'number',
      fixed: 'left',
      // sorter: true,  //升降序
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      // width: 150,
      key: 'name',
      fixed: 'left',

      render: (text, record) => {
        return (
          <>
            <div
              onClick={() => {
                setinfomodalVisible(true);
              }}
            >
              {record.name}
            </div>
          </>
        );
      },
    },
    {
      title: '社团类别',
      dataIndex: 'category',
      // width: 100,
      key: 'category',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
        { text: 'D', value: 'd' },
      ],
    },
    {
      title: '社团级别',
      dataIndex: 'level',
      // width: 100,
      key: 'level',
      hideInSearch: true,
      filters: [
        {
          text: '一级社团',
          value: 'one',
        },
        {
          text: '二级社团',
          value: 'two',
        },
        {
          text: '三级社团',
          value: 'three',
        },
      ],
    },
    {
      title: '业务指导单位',
      dataIndex: 'unit',
      // width: 120,
      key: 'unit',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
      ],
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      hideInSearch: false,
      key: 'status',
      // width: 100,
      valueEnum: {
        // 0: { text: '毕业', status: 'Default' },
        // 1: { text: '休学', status: 'Processing' },
        2: { text: '已审批', status: 'Success' },
        3: { text: '未审批', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setVisible(true);
            }}
          >
            审核
          </a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const radioOnchange = (e: any) => {
    setRadiovalue(e.target.value);
    if (e.target.value === 1) {
      setReasondisplay('none');
    } else if (e.target.value === 2) {
      setReasondisplay('');
    }
  };

  const onOk = () => {
    console.log(checkValue);
    if (checkValue == {}) {
      message.warning('请选择拒绝理由');
    } else {
      console.log(2);
      setVisible(false);
    }
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setRulevisible(true)}>
            <ToolOutlined /> 设置
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <Infomodal
        onCancel={() => {
          setinfomodalVisible(false);
        }}
        modalVisible={infomodalVisible}
      />
      <Modal
        destroyOnClose
        title="审批"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onOk}
      >
        <div>
          <Form {...layout} name="basic">
            <Form.Item label="请选择" name="examination" rules={[{ required: true }]}>
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
                onChange={(value) => {
                  setcheckValue(value);
                }}
              >
                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                  Awqeqeweqeq
                </Checkbox>
                <br />
                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                  B
                </Checkbox>
                <br />
                <Checkbox value="C" style={{ lineHeight: '32px' }}>
                  C
                </Checkbox>
                <br />
                <Checkbox value="D" style={{ lineHeight: '32px' }}>
                  D
                </Checkbox>
                <br />
                <Checkbox value="E" style={{ lineHeight: '32px' }}>
                  E
                </Checkbox>
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
        onOk={() => {
          setRulevisible(false);
        }}
      >
        <Form {...layout} name="basic">
          <Form.Item label="添加理由" name="examination" rules={[{ required: true }]}>
            <Form.List name="teacher">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="start"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, 'first']}
                          fieldKey={[field.fieldKey, 'first']}
                          rules={[{ required: true }]}
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
