// 社团成员列表 组件

import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { queryRule, updateRule } from '@/pages/AssociationList/member/service';
import UpdateForm, { FormValueType } from '@/pages/AssociationList/member/components/UpdateForm';
import { TableListItem } from '@/pages/AssociationList/member/data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';


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



const Member: React.FC<{}> = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '证件照',
      dataIndex: 'number',
      width: 150,
      key: 'number',
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '学号',
      dataIndex: 'logo',
      width: 100,
      key: 'logo',
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'chinesename',
      width: 150,
      key: 'chinesename',
      fixed: 'left',
    },
    {
      title: '所在社团',
      dataIndex: 'unit',
      width: 200,
      key: 'unit',
      hideInSearch: true,
    },
    {
      title: '社团部门',
      dataIndex: 'count',
      width: 200,
      key: 'count',
      hideInSearch: true,
    },
    {
      title: '社团职务',
      dataIndex: 'initiator',
      width: 200,
      key: 'initiator',
      hideInSearch: true,
    },
    {
      title: '社团骨干',
      dataIndex: 'memberVIP',
      width: 200,
      key: 'memberVIP',
      hideInSearch: true,

    },
    {
      title: '起止日期',
      dataIndex: 'start',
      width: 200,
      key: 'start',
    },
    {
      title: '在岗状态',
      dataIndex: 'staus',
      width: 200,
      key: 'staus',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 200,
      key: 'sex',
      hideInSearch: true,
    },
    {
      title: '学院',
      dataIndex: 'college',
      width: 100,
      key: 'college',
      hideInSearch: true,
    },
    {
      title: '专业',
      dataIndex: 'specialty',
      width: 150,
      key: 'specialty',
      hideInSearch: true,
    },
    {
      title: '学制',
      dataIndex: 'educational',
      width: 150,
      key: 'educational',
      hideInSearch: true,

    },
    {
      title: '班级',
      dataIndex: 'class',
      width: 100,
      key: 'class',
    },
    {
      title: '年级',
      dataIndex: 'grade',
      width: 100,
      key: 'grade',
      hideInSearch: true,
    },
    {
      title: '入学时间',
      dataIndex: 'startTime',
      width: 150,
      key: 'startTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '身份证号',
      dataIndex: 'IdCard',
      width: 100,
      key: 'IdCard'
    },
    {
      title: '籍贯',
      dataIndex: 'birthPlace',
      width: 150,
      key: 'birthPlace',
      hideInSearch: true,
    },
    {
      title: '民族',
      dataIndex: 'nation',
      width: 100,
      key: 'nation',
      hideInSearch: true,
    },
    {
      title: '政治面貌',
      dataIndex: 'political',
      width: 100,
      key: 'political',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 150,
      key: 'phone'
    },
    {
      title: 'QQ号',
      dataIndex: 'QQ',
      width: 150,
      key: 'QQ'
    },

  ];




  return (
    <>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="key"
        rowClassName={(record, index) => {
          let className = 'light-row';
          if (index % 2 === 1) className = 'dark-row';
          return className;
        }}
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default" size={'small'}>
            <DownloadOutlined /> 导出
        </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button size={"small"}>
              <DownloadOutlined /> 批量导出
            </Button>
          ),
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
        scroll={{ x: 1500 }}
      />
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
    </>
  );
};

export default Member;
