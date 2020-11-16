// 招新设置 组件

import React, { useRef, useState } from 'react';

import { Button, DatePicker, Divider, Image, message, Popconfirm } from 'antd';
import { connect } from 'umi';
import { PlusOutlined, QrcodeOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import SettingModal from './components/SettingModal';
import EditorModal from './components/EditorModal';
import AddModal from './components/AddModal';

const Statistic: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [settingmodalVisible, setSettingmodalVisible] = useState(false);
  const [EditorModalVisible, setEditorModalVIsible] = useState(false);
  const [formValue, setFormValue] = useState<any>({});
  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const [imgPath, setImgPath] = useState<string>(
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603790956805&di=f790eea405e9fa1fde821f54d7716ddf&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F25%2F04%2F20%2F16571d91951a416.jpg',
  );
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '招新要求',
      dataIndex: 'requirements',
      key: 'requirements',
    },
    {
      title: '招新人数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '报名人数',
      dataIndex: 'registrationnumber',
      key: 'registrationnumber',
    },
    {
      title: '录取人数',
      dataIndex: 'enrollmentnumber',
      key: 'enrollmentnumber',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditorModalVIsible(true);
              setFormValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={confirm} onCancel={cancel}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const confirm = () => {
    message.success('删除成功');
  };

  const cancel = () => {
    message.error('取消删除');
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={''}
        toolBarRender={(action, {}) => [
          // <Search enterButton />,
          <DatePicker picker="year" />,
          <Button type="primary" onClick={() => setSettingmodalVisible(true)}>
            <SettingOutlined />
            设置
          </Button>,
          <Button type="primary" onClick={() => setAddmodalVisible(true)}>
            <PlusOutlined />
            新增
          </Button>,
          <Button
            type="default"
            onClick={() => {
              document.getElementById('settingQRCode')?.click();
            }}
          >
            <QrcodeOutlined />
            二维码
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <EditorModal
        modalVisible={EditorModalVisible}
        onCancel={() => setEditorModalVIsible(false)}
        formValue={formValue}
      />
      <SettingModal
        modalVisible={settingmodalVisible}
        onCancel={() => setSettingmodalVisible(false)}
      />
      <AddModal modalVisible={addmodalVisible} onCancel={() => setAddmodalVisible(false)} />
      <Image style={{ display: 'none' }} id={'settingQRCode'} src={imgPath} />
    </div>
  );
};

export default connect()(Statistic);
