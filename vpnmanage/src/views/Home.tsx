
import { Card, Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

const View = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const cardStyle = {
    width: '100%',
    // marginBottom: '16px',
    marginTop: '16px', 
    
  };

  const colStyle = {
    padding: '0 8px', 
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
    </Row>
  );
};

export default View;