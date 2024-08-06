import { Button, Radio, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/views/Login/login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        email: values.email,
        password: values.password,
        confirmPassword: values.passwordConfirm
      });
      console.log(response.data);
      message.success('register successful!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('register failed, please try again');
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
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'enter email' },
              { type: 'email', message: 'please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
              size='large'
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'enter password' },
              { min: 6, message: 'password can not less than 6 words' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
            />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'confirm password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="confirm"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
            />
          </Form.Item>
          <Form.Item 
            name="agreement" 
            valuePropName="checked"
            rules={[
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('请同意服务条款')) },
            ]}
          >
            <Radio>Registration means you agree to the terms of service</Radio>
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
            already have account? 
            <Link to="/login">
              login now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default View;