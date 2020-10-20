// 单位设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule } from './service';

/**
 * 添加节点
 * @param fields
 */
// const handleAdd = async (fields: TableListItem) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

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

/**
 *  删除节点
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: TableListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };

const { Search } = Input

const Department: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单位号',
      dataIndex: 'departmentID',
      width: '10%',
      key: 'departmentID',
      hideInSearch: true,
    },
    {
      title: '单位全称',
      dataIndex: 'departmentfull',
      width: '25%',
      key: 'departmentfull'
    },
    {
      title: '单位简称',
      dataIndex: 'academicsyssimple',
      width: '15%',
      key: 'academicsyssimple',
      hideInSearch: true,
    },
    {
      title: '单位类别',
      dataIndex: 'departmenttype',
      width: '10%',
      key: 'departmenttype',
      hideInSearch: true,
    },
    {
      title: '子单位',
      dataIndex: 'departmentchild',
      width: '15%',
      key: 'departmentchild',
      hideInSearch: true,
    },
    {
      title: '排序号',
      dataIndex: 'sort',
      width: '10%',
      key: 'sort',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">子单位</a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'单位列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入部门名称'} />,
          <Button type="primary" onClick={() => handleModalVisible(true)} size={'middle'}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default" onClick={() => handleModalVisible(true)} size={'middle'}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
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

export default Department;
