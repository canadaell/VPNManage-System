import { Button, Checkbox, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/views/Login/login.module.scss';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [userNameVal, setUserNameVal] = useState("")
  const [passwordVal, setPasswordVal] = useState("")

  const userNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setUserNameVal(e.target.value)
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setPasswordVal(e.target.value)
  }

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: values.email,
        password: values.password
      });
      console.log('Login response:', response.data);
      message.success('登录成功！');
      // if login success, store token in localStorage
      // localStorage.setItem('token', response.data.token);
      navigate('/layout/home'); // redirect to home
    } catch (error) {
      console.error('Login failed:', error);
      message.error('登录失败，请检查您的邮箱和密码。');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}>
          <img src="path_to_logo" alt="Logo" />
        </div>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="邮箱"
              size='large'
              onChange={userNameChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="密码"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
              onChange={passwordChange}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            还没有账号? 
            <Link to="/register">
              马上注册
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default View;