import React from 'react';
import api from '../../services/api';
import { Form, Input, Button } from 'antd';


const FormRegra = (props) => {
  let sys = props.system;

  const onFinish = async (values) => {

    try {
      await api.post('/regra',{sistema:sys, titulo:values.titulo,funcionalidade:values.funcionalidade,descricao:values.descricao},{headers: {'Content-Type': 'application/json'}}).then(t=>{
        return t;
      }
      );
      
    } catch (error) {
      return error;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
      <>
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        label="Funcionalidade"
        name="funcionalidade"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Título"
        name="titulo"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Descrição"
        name="descricao"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default FormRegra;