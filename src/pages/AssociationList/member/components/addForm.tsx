import React, { useRef } from 'react';
import { Modal, Form, Button } from 'antd';

import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom';
import { connect, Dispatch } from 'umi';

export interface GlobalModelState {
  association: any;
}

interface AddFormProps {
  addVisible: boolean;
  onCancel: () => void;
  communityID: any;
  afterClose: () => void;
  dispatch: Dispatch;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

const FormItem = Form.Item;

const AddForm: React.FC<AddFormProps> = (props) => {
  // input 输入框属性
  const info: { one: InputInfo; two?: InputInfo; three?: InputInfo } = {
    one: {
      message: '请输入新增成员学号!',
      placeHodel: '请输入成员学号',
    },
  };

  const { addVisible, onCancel, communityID, dispatch, afterClose } = props;

  const button = useRef<HTMLButtonElement>(null);

  const onFinish = (e: any) => {
    var json = new Array();
    for (var i = 0; i < e.memberList.length; i++) {
      json.push(e.memberList[i].one);
    }

    const data = {
      communityID: communityID.id,
      memberList: json,
    };

    dispatch({
      type: 'associationMember/addMember',
      payload: data,
    });

    onCancel();

    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  };

  return (
    <Modal
      destroyOnClose
      title="新增成员"
      visible={addVisible}
      onCancel={() => onCancel()}
      onOk={() => button.current?.click()}
    >
      <Form onFinish={onFinish} autoComplete={'off'} hideRequiredMark>
        <FormItem {...formItemLayout} name={'studentID'} label={'学号'}>
          <FormListCom
            formListName={'memberList'}
            info={info}
            showInput={{ two: false, three: false }}
          />
        </FormItem>

        <FormItem style={{ display: 'none' }}>
          <Button htmlType={'submit'} ref={button} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default connect(({ global }: { global: GlobalModelState }) => {
  return { communityID: global.association };
})(AddForm);
