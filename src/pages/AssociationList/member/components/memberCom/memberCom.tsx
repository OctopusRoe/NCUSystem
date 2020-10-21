//

import { Button, Divider, message } from 'antd';

import React, { useRef, useState } from 'react';
import { queryRule, updateRule } from './service';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
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

const MemberCom: React.FC<{}> = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'period',
      // width: 200,
      key: 'period',
      fixed: 'left',
      valueEnum: {
        0: { text: 'A', status: 'a' },
        1: { text: 'B', status: 'b' },
        2: { text: 'C', status: 'c' },
        3: { text: 'D', status: 'd' },
      },
    },
    {
      title: '证件照',
      dataIndex: 'photo',
      // width: 150,
      key: 'photo',
      hideInSearch: true,
      fixed: 'left',
      render: (text, record) => {
        const img = record.photo;
        return (
          <>
            <img src={img} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
          </>
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      // width: 150,
      key: 'name',
      fixed: 'left',
    },
    {
      title: '学号',
      dataIndex: 'stuid',
      // width: 100,
      key: 'stuid',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      // width: 200,
      key: 'sex',
      hideInSearch: true,
    },

    {
      title: '所在部门',
      dataIndex: 'department',
      // width: 200,
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '职务',
      dataIndex: 'position',
      // width: 200,
      key: 'position',
      hideInSearch: true,
    },
    // {
    //   title: '社团负责人',
    //   dataIndex: 'principal',
    //   width: 200,
    //   key: 'principal',
    //   hideInSearch: true,
    // },
    // {
    //   title: '社团骨干',
    //   dataIndex: 'memberVIP',
    //   width: 200,
    //   key: 'memberVIP',
    // },
    // {
    //   title: '政治面貌',
    //   dataIndex: 'political',
    //   // width: 100,
    //   key: 'political',
    //   hideInSearch: true,
    // },
    {
      title: '手机号',
      dataIndex: 'phone',
      // width: 150,
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: 'QQ号',
      dataIndex: 'QQ',
      // width: 150,
      key: 'QQ',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a>调整</a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
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
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button>
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

export default MemberCom;
