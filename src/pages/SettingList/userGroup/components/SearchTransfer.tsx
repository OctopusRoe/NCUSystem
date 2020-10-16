// 带有搜索框的穿梭框

import React from "react"
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: any) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item: any) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected: any, selectedRows: any) {
          const treeSelectedKeys = selectedRows
            .filter((item: any) => !item.disabled)
            .map(({ key }: any) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }: any, selected: any) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          // style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

// const mockTags = [{name: '信工学院', color: 'blue'}, {name: '医学院', color: 'purple'}, {name: '保卫处', color: 'red'}];

const mockData: any = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    ID: `00000${i + 1}`,
    name: `description of content${i + 1}`,
  });
}

const originTargetKeys = mockData.filter((item: any) => +item.key % 3 > 1).map((item: any) => item.key);

const leftTableColumns = [
  {
    dataIndex: 'ID',
    title: '学号/工号',
  },
  {
    dataIndex: 'name',
    title: '姓名',
  },
  // {
  //   dataIndex: 'department',
  //   title: '学院/部门',
  //   render: (department: any) => <Tag color={department.color}>{department.name}</Tag>
  // },
];
const rightTableColumns = [
  {
    dataIndex: 'ID',
    title: '学号/工号',
  },
  {
    dataIndex: 'name',
    title: '姓名',
  },
  // {
  //   dataIndex: 'department',
  //   title: '学院/部门',
  //   render: (department: any) => <Tag color={department.color}>{department.name}</Tag>
  // },
];

class SearchTransfer extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: true,
  };

  onChange = (nextTargetKeys: any) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = (disabled: any) => {
    this.setState({ disabled });
  };

  triggerShowSearch = (showSearch: any) => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys, disabled, showSearch } = this.state;
    return (
      <>
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          onChange={this.onChange}
          filterOption={(inputValue: any, item: any) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </>
    );
  }
}

export default SearchTransfer