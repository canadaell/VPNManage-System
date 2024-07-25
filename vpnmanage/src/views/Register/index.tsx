import { Button, Radio, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/views/Login/login.module.scss';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const [userNameVal, setUserNameVal] = useState("")
  const [passwordVal, setPasswordVal] = useState("")
  const [confirmPasswordVal, setConfirmPasswordVal] = useState("")

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const userNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setUserNameVal(e.target.value)
  }
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setPasswordVal(e.target.value)
  }
  const confirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setConfirmPasswordVal(e.target.value)
  }



//register event
const goRegister = async () => {
  try {
    const response = await axios.post('http://localhost3001/api/register', {
      email: userNameVal,
      password: passwordVal,
      confirmPassword: confirmPasswordVal
    });
    console.log(response.data);
    //register success
  } catch (error) {
    console.error('Registration failed:', error);
    // register failed
  }
}

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}>
          <img src="path_to_logo" alt="Logo" />
        </div>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="邮箱" 
            size='large'
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                size='large'
            />
          </Form.Item>
          <Form.Item
            name="password-confirm"
            rules={[{ required: true, message: '请再次确认密码' }]}
          >
            <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="确认密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                size='large'
            />
          </Form.Item>
          <Form.Item >
            <Radio>注册即代表同意服务条款</Radio>
          </Form.Item>
          <Form.Item>
            <Button 
            type="primary" 
            htmlType="submit" 
            className={styles.loginFormButton}
            onClick={goRegister}
            >
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            已经有账号? 
            <Link to = "/login">
            <a href="">马上登录</a>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default View;
