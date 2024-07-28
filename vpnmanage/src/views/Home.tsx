
import { Card, Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

const View = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const cardStyle = {
    width: '100%',
    // marginBottom: '16px',// 添加下方 margin
    marginTop: '16px', // 添加上方 margin
    
  };

  const colStyle = {
    padding: '0 8px', // 左右各添加 8px 的 padding，形成 16px 的间隔
  };

  return (
    <Row gutter={isMobile ? [0, 16] : [16, 16]}>
      <Col xs={24} sm={24} md={12} lg={6} style={colStyle}>
        <Card title="Subscription" extra={<a href="#">more</a>} style={cardStyle}>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} style={colStyle}>
        <Card title="Remaining data" extra={<a href="#">more</a>} style={cardStyle}>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} style={colStyle}>
        <Card title="Online IP Quantity" extra={<a href="#">more</a>} style={cardStyle}>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} style={colStyle}>
        <Card title="My wallet" extra={<a href="#">more</a>} style={cardStyle}>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Col>
    </Row>
  );
};

export default View;