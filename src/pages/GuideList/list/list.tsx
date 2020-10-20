// 社团列表页面

import React, { useState, useRef } from 'react';

import { DownloadOutlined } from '@ant-design/icons';
import { Button, message, Input } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule } from './service';
import InfoModal from '@/components/InfoModal/Infomodal'
// import styles from './student.less'

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

const List: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '社团Logo',
      dataIndex: 'photo',
      width: '10%',
      key: 'photo',
      hideInSearch: true,
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
      title: '社团名称',
      dataIndex: 'associationName',
      width: '20%',
      key: 'associationName',
      fixed: 'left',
      render: (_, record) => {
        return (
          <>
            <div onClick={()=>{setShowInfoModal(true)}}>{record.name}</div>
          </>
        )
      }
    },
    {
      title: '社团类别',
      dataIndex: 'associationType',
      width: '15%',
      key: 'associationType',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '社团级别',
      dataIndex: 'associationGrade',
      width: '15%',
      key: 'associationGrade',
      valueEnum: {
        0: {text: '级别1'},
        1: {text: '级别2'},
        2: {text: '级别3'},
        3: {text: '级别4'},
        4: {text: '级别5'},
        5: {text: '级别6'},
      }
    },
    {
      title: '业务指导单位',
      dataIndex: 'department',
      width: '15%',
      key: 'department',
      valueEnum: {
        0: {text: '单位1'},
        1: {text: '单位2'},
        2: {text: '单位3'},
        3: {text: '单位4'},
        4: {text: '单位5'},
        5: {text: '单位6'},
      }
    },
    {
      title: '成立时间',
      dataIndex: 'startTime',
      width: '15%',
      key: 'startTime',
      hideInSearch: true,
    },
    {
      title: '社团成员数(最高)',
      dataIndex: 'persons',
      width: '10%',
      key: 'persons',
      hideInSearch: true,
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="default" onClick={() => handleModalVisible(true)} size={'middle'}>
            <DownloadOutlined /> 导出
          </Button>
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      <InfoModal modalVisible={showInfoModal} onCancel={()=>{setShowInfoModal(false)}} />
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

export default List;