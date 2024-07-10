import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/views/Login/login.module.scss';

const View = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}>
          <img src="path_to_logo" alt="Logo" />
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" size='large'/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              size='large'
            />
          </Form.Item>
          <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className={styles.loginFormForgot} href="">
              忘记密码?
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            还没有账号? <a href="">马上注册</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default View;
