import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

interface SubscriptionData {
  start_date: string;
  end_date: string;
}

const View = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  const cardStyle = {
    width: '100%',
    marginTop: '16px',
  };

  const colStyle = {
    padding: '0 8px',
  };

  // 从 localStorage 获取 email 和 user_id
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3001/api/displaydate?user_id=${userId}`);
          setSubscriptionData(response.data.subscriptions[0]); 
        } catch (error) {
          console.error('Error fetching subscription data:', error);
        }
      }
    };

    fetchSubscriptionData();
  }, [userId]);

  return (
    <Row gutter={isMobile ? [0, 16] : [16, 16]}>
      <Col xs={24} sm={24} md={12} lg={6} style={colStyle}>
        <Card title="Subscription" extra={<a href="#">more</a>} style={cardStyle}>
          <p>Email: {userEmail}</p>
          {subscriptionData ? (
            <>
              <p>Subscription start date: {new Date(subscriptionData!.start_date).toLocaleDateString()}</p>
              <p>Subscription end date: {new Date(subscriptionData!.end_date).toLocaleDateString()}</p>
            </>
          ) : (
            <p>Subscription not purchased</p>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default View;