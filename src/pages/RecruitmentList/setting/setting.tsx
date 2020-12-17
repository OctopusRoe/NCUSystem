// 招新设置 组件

import React, { useEffect, useState } from 'react';

import { Button, DatePicker, Divider, Image, Popconfirm } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { connect, Dispatch } from 'umi';
import { PlusOutlined, QrcodeOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { TableListItem, RecruitmentSettingState } from './data.d';

import SettingModal from './components/SettingModal';
import EditorModal from './components/EditorModal';
import AddModal from './components/AddModal';

import moment from 'moment'

interface StatisticProps {
  dataSource: any
  loading: boolean
  count: number
  dispatch: Dispatch
}

const Statistic: React.FC<StatisticProps> = (props) => {

  const { dataSource, loading, count, dispatch } = props

  const [settingmodalVisible, setSettingmodalVisible] = useState(false);
  const [EditorModalVisible, setEditorModalVIsible] = useState(false);
  const [formValue, setFormValue] = useState<any>({});
  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const [imgPath, setImgPath] = useState<string>(
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603790956805&di=f790eea405e9fa1fde821f54d7716ddf&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F25%2F04%2F20%2F16571d91951a416.jpg',
  );

  const [current, setCurrent] = useState<number>(0)

  const [searchValue, setSearchValue] = useState<number>()
 
  
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
      dataIndex: 'request',
      key: 'request',
    },
    {
      title: '招新人数',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '报名人数',
      dataIndex: 'entryNumber',
      key: 'entryNumber',
    },
    {
      title: '录取人数',
      dataIndex: 'admissionNumber',
      key: 'admissionNumber',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        0: { text: '招新中', status: 'success'},
        1: { text: '已招满', status: 'default'}
      }
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
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)} >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'recruitmentSetting/searchList',
      payload: {}
    })

    dispatch({
      type: 'recruitmentSetting/getSetInfo'
    })

    dispatch({
      type: 'recruitmentSetting/getInfo'
    })

    return () => {
      dispatch({
        type: 'recruitmentSetting/clean'
      })

      setSearchValue(new Date().getFullYear())
    }
  },[])

  // 删除
  const confirm = (id: string) => {
    dispatch({
      type: 'recruitmentSetting/deletPosition',
      payload: id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000)
  };

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    
    const params = {
      year: searchValue,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current
    }

    dispatch({
      type: 'recruitmentSetting/loading',
      payload: true
    })

    dispatch({
      type: 'recruitmentSetting/searchList',
      paylaod: params
    })

    setCurrent(pagination.current as number)
  }

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'recruitmentSetting/loading',
      payload: true
    })

    dispatch({
      type: 'recruitmentSetting/searchList',
      payload: {}
    })
  }

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        headerTitle={''}
        toolBarRender={(action, {}) => [
          <DatePicker
            picker="year"
            defaultValue={moment(new Date().getFullYear().toString(), 'YYYY')}
            onChange={(e) => {
              setSearchValue(e?.year())
              dispatch({
                type: 'recruitmentSetting/loading',
                payload: true
              })
              dispatch({
                type: 'recruitmentSetting/searchList',
                payload: {year: e?.year()}
              })
            }}
          />,
          <Button
            type="primary"
            onClick={() => setSettingmodalVisible(true)}
          >
            <SettingOutlined />
            设置
          </Button>,
          <Button
            type="primary"
            onClick={() => setAddmodalVisible(true)}
          >
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
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        pagination={{ total: count, current: current}}
      />
      <EditorModal
        formValue={formValue}
        afterClose={reloadValue}
        modalVisible={EditorModalVisible}
        onCancel={() => setEditorModalVIsible(false)}
      />
      <SettingModal
        modalVisible={settingmodalVisible}
        onCancel={() => setSettingmodalVisible(false)}
      />
      <AddModal
        afterClose={reloadValue}
        modalVisible={addmodalVisible}
        onCancel={() => setAddmodalVisible(false)}
      />
      <Image style={{ display: 'none' }} id={'settingQRCode'} src={imgPath} />
    </div>
  );
};

export default connect(
  ({recruitmentSetting}: {recruitmentSetting: RecruitmentSettingState}) => ({
    dataSource: recruitmentSetting.list,
    loading: recruitmentSetting.loading,
    count: recruitmentSetting.count
  })
)(Statistic);
