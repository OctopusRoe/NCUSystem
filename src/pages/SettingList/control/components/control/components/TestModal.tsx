import { Button, Space,  } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface AddModalFormProps {
  modalVisible: boolean;
}

const TestList = () => {
  return (
    <div>
      <Space>
        <Button type="default">取消</Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Space>
    </div>
  );
};

const TestModal: React.FC<AddModalFormProps> = (porps) => {
  const { modalVisible } = porps;

  return (
    <Modal destroyOnClose title="新增应用" visible={modalVisible} footer={<TestList />}>
      <div>adasdafasfafa</div>
    </Modal>
  );
};

export default TestModal;
