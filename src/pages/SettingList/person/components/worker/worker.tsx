// 用户管理页面

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
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

const Worker: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '证件照',
      dataIndex: 'photo',
      key: 'photo',
      hideInSearch: true,
      width: 100,
      fixed: 'left',
      render: (text, record)=>{
        const img = record.photo
        return (
          <>
            <img src={img} alt="" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
          </>
        )
      }
    },
    {
      title: '工号',
      dataIndex: 'studentId',
      width: 120,
      key: 'studentId',
      fixed: 'left'
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: 80,
      key: 'userName',
      fixed: 'left'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      width: 100,
      key: 'sex'
    },
    {
      title: '部门',
      dataIndex: 'departmentId',
      hideInSearch: true,
      key: 'departmentId',
      width: 200
    },
    {
      title: '民族',
      dataIndex: 'nation',
      hideInSearch: true,
      key: 'nation',
      width: 150,
      valueEnum: {
        0: { text: '汉族'},
        1: { text: '回族'},
        2: { text: '维吾尔族'},
        3: { text: '其他'},
      },
    },
    {
      title: '政治面貌',
      dataIndex: 'political',
      hideInSearch: true,
      key: 'political',
      width: 150
    },
    {
      title: '籍贯',
      dataIndex: 'birthPlace',
      hideInSearch: true,
      key: 'birthPlace',
      width: 150
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: '头像',
      dataIndex: 'profile',
      hideInSearch: true,
      key: 'profile',
      width: 100,
      render: (text, record)=>{
        const img = record.profile
        return (
          <>
            <img src={img} alt="" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        scroll={{x: "1400"}}
        // headerTitle="教工列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)} size={'small'}>
            <PlusOutlined /> 新增
          </Button>,
          // <Button type="primary" onClick={() => handleModalVisible(true)} size={'small'}>
          //   <UploadOutlined /> 导入
          // </Button>,
          <Button type="default" onClick={() => handleModalVisible(true)} size={'small'}>
            <DownloadOutlined /> 导出
          </Button>,
          // selectedRows && selectedRows.length > 0 && (
          //   <Dropdown
          //     overlay={
          //       <Menu
          //         onClick={async (e) => {
          //           if (e.key === 'remove') {
          //             await handleRemove(selectedRows);
          //             action.reload();
          //           }
          //         }}
          //         selectedKeys={[]}
          //       >
          //         <Menu.Item key="remove">批量删除</Menu.Item>
          //         <Menu.Item key="approval">批量审批</Menu.Item>
          //       </Menu>
          //     }
          //   >
          //     <Button size={"small"}>
          //       批量操作 <DownOutlined />
          //     </Button>
          //   </Dropdown>
          // ),
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

export default Worker;
