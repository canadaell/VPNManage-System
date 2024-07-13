import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from '@/views/Login/login.module.scss';
import { ChangeEvent, useState } from 'react';

const View = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
//get user input 
const [userNameVal, setUserNameVal] = useState("")
const [passwordVal, setPasswordVal] = useState("")
const [captchaVal, setCaptchaVal] = useState("")
const userNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setUserNameVal(e.target.value)
}
const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setPasswordVal(e.target.value)
}
const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setCaptchaVal(e.target.value)
}

//login event
const goLogin = () => {
    console.log(userNameVal, passwordVal, captchaVal)
}


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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
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
          <Form.Item name="captchaBox" rules={[{required: true, message:"请输入验证码"}]} >
          <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 100px)' }}
                prefix={<KeyOutlined className="site-form-item-icon" />}
                placeholder="验证码"
                size='large'
                onChange={captchaChange}
              />
              <img
                src= ""
                alt="Captcha"
                style={{
                  width: '99px',
                  height: '38px',
                  cursor: 'pointer',
                  border: '1px solid #d9d9d9',
                  borderRadius: '2px',
                }}
                onClick={() => {
                  // add event to refresh captcha
                  console.log('刷新验证码');
                }}
              />
            </Input.Group>
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
            <Button 
            type="primary" 
            htmlType="submit" 
            className={styles.loginFormButton}
            onClick={goLogin}
            >
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
