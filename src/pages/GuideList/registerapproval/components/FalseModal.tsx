import { Button, Modal, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';


interface FalseModalProps{
  modalVisible:boolean;
  onCancel:()=>void;
}


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

const FalseModal: React.FC<FalseModalProps> = (props) => {
  return (
    <>
      <Modal
        title=""
        // visible={modalVisible}
        // onCancel={() => onCancel()}
        width="800px"
        footer={<TestList />}
      >
        
      </Modal>
    </>
  );
};

export default FalseModal;
