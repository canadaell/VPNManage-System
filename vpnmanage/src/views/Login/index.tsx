// @ts-nocheck
import { Button, Checkbox, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/views/Login/login.module.scss';
import { ChangeEvent, useState} from 'react';
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
  
      if (response.data.token) {
        // login success
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', values.email);
        localStorage.setItem('user_id', response.data.userId);
        message.success('login success!');
        navigate('/layout/home');
      } else {
        // login failed without token
        message.error(response.data.message || 'login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('login failed, please try again');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}>
          <img src="../public/ACELink.png" alt="Logo" />
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
              { required: true, message: 'enter your email' },
              { type: 'email', message: 'please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
              size='large'
              onChange={userNameChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'enter password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
              onChange={passwordChange}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              login
            </Button>
          </Form.Item>
          <Form.Item>
            don't have account? 
            <Link to="/register">
              register now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default View;