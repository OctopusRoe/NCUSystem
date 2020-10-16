import { Button, Checkbox, Col, Divider, Dropdown, Form, Input, Menu, message, Modal, Popconfirm, Radio, Row, Space } from 'antd';

// 审批页面

import React, { useRef, useState } from 'react';
import { queryRule, removeRule, updateRule } from '@/pages/ListTableList/service';
import UpdateForm, { FormValueType } from '@/pages/ListTableList/components/UpdateForm';
import { TableListItem } from '@/pages/ListTableList/data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownOutlined, MinusCircleOutlined, PlusOutlined, ToolOutlined } from '@ant-design/icons';


/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};



const Approval: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [visible, setVisible] = useState(false)
  const [rulevisible, setRulevisible] = useState(false)
  const [checkValue, setcheckValue] = useState({})
  const [reasondisplay, setReasondisplay] = useState('none')
  const [radiovalue, setRadiovalue] = useState(1)
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      key: 'number',
      title: '申请编号',
      dataIndex: 'number',
      width: 120,
      fixed: 'left',
      sorter: true,
    },
    {
      key: 'chinesename',
      title: '社团中文全称',
      width: 150,
      dataIndex: 'chinesename',
      fixed: 'left',
    },
    {
      key: 'englishname',
      title: '社团英文全称',
      width: 200,
      dataIndex: 'englishname',
    },
    {
      key: 'category',
      title: '社团类别',
      width: 100,
      dataIndex: 'category',
    },
    {
      key: 'level',
      title: '社团等级',
      width: 100,
      dataIndex: 'level',
      sorter: true,
    },
    {
      key: 'unit',
      title: '业务指导单位',
      width: 120,
      dataIndex: 'unit',
    },
    {
      key: 'count',
      title: '社团成员数',
      width: 120,
      search: false,
      dataIndex: 'count',
      sorter: true,
    },
    {
      key: 'constitution',
      title: '社团章程',
      width: 120,
      dataIndex: 'constitution',
    },
    {
      key: 'initiator',
      title: '发起人',
      width: 100,
      dataIndex: 'initiator',
    },
    {
      key: 'time',
      title: '申请时间',
      width: 150,
      search: false,
      dataIndex: 'time',
      sorter: true,
    },
    {
      key: 'teacher',
      title: '指导老师',
      width: 100,
      dataIndex: 'teacher',
    },
    {
      key: 'materials',
      title: '申请材料',
      width: 150,
      search: false,
      dataIndex: 'materials',
    },
    {
      key: 'departmentInitiator',
      title: '部门审批人',
      width: 100,
      dataIndex: 'departmentInitiator',
    },
    {
      key: 'departmentTime',
      title: '部门审批时间',
      width: 150,
      search: false,
      dataIndex: 'departmentTime',
      sorter: true,
    },
    {
      key: 'schoolInitiator',
      title: '学校审批人',
      width: 100,
      dataIndex: 'schoolInitiator',
    },
    {
      key: 'schoolTime',
      title: '学校审批时间',
      width: 150,
      search: false,
      dataIndex: 'schoolTime',
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
          // <ToolOutlined style={{ fontSize: '16px' }} onClick={() => { setRulevisible(true) }} />
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
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </div>
  );
};

export default Approval;
