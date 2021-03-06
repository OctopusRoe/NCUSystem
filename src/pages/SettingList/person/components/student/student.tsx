// 用户管理页面

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Switch } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import InfoModal from '@/components/InfoModal/Infomodal';
import CreateForm from '@/components/CreateForm/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule } from './service';
import ModalForm from '../student/components/ModalForm'

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

const Student: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [infomodalModalVisible, handleinfomodalModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户类别',
      dataIndex: 'category',
      hideInSearch: true,
      key: 'category',
      width: 150,
      fixed: 'left',
    },
    {
      title: '证件照',
      dataIndex: 'photo',
      key: 'photo',
      hideInSearch: true,
      width: 100,
      fixed: 'left',
      render: (text, record) => {
        const img = record.photo;
        return (
          <>
            <img
              src={img}
              alt=""
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              onClick={() => handleinfomodalModalVisible(true)}
            />
          </>
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: 80,
      key: 'userName',
      fixed: 'left',
    },
    {
      title: '学号/工号',
      dataIndex: 'studentId',
      width: 120,
      key: 'studentId',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      width: 100,
      key: 'sex',
    },
    {
      title: '身份证号',
      dataIndex: 'IdCard',
      hideInSearch: false,
      key: 'IdCard',
      width: 150,
    },
    {
      title: '学院/单位',
      dataIndex: 'college',
      hideInSearch: true,
      key: 'college',
      width: 200,
    },
    {
      title: '班级',
      dataIndex: 'class',
      hideInSearch: true,
      key: 'class',
      width: 200,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: false,
      key: 'phone',
      width: 150,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => {}}>密码重置</a>
          <Divider type="vertical" />
          <Switch checkedChildren="锁定" unCheckedChildren="解除" defaultChecked />
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        scroll={{ x: '1800' }}
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,       
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        // rowSelection={{}}
      />
      <InfoModal
        onCancel={() => handleinfomodalModalVisible(false)}
        modalVisible={infomodalModalVisible}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} form={<ModalForm/>}/>
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

export default Student;
