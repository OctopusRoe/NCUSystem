import { Button, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const TestList = () => {
  return (
    <>
      <FormItem>
        <Space>
          <Button type="default">取消</Button>
          <Button type="primary">保存</Button>
        </Space>
      </FormItem>
    </>
  );
};

const SettingModal: React.FC<{}> = () => {
  return (
    <>
      <Modal
        destroyOnClose
        title="设置"
        // visible={modalVisible}
        // onCancel={() => onCancel()}
        footer={<TestList />}
      ></Modal>
    </>
  );
};

export default SettingModal;
