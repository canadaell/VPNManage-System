import { useState, useEffect } from 'react';
import { Alert, Card, Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { getPaymentStatusNote } from '@/utils/paymentStatus';

interface SubscriptionData {
  start_date: string;
  end_date: string;
}

const View = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [isPaymentStatusUnavailable, setIsPaymentStatusUnavailable] = useState(false);
  const [isPaymentStatusResolved, setIsPaymentStatusResolved] = useState(false);

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
    let isCurrentRequest = true;

    const fetchSubscriptionData = async () => {
      setIsPaymentStatusResolved(false);

      if (!userId) {
        setSubscriptionData(null);
        setIsPaymentStatusUnavailable(true);
        setIsPaymentStatusResolved(true);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/api/displaydate?user_id=${userId}`);

        if (isCurrentRequest) {
          setSubscriptionData(response.data.subscriptions[0]);
          setIsPaymentStatusUnavailable(false);
        }
      } catch (error) {
        if (!isCurrentRequest) {
          return;
        }

        setSubscriptionData(null);

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setIsPaymentStatusUnavailable(false);
        } else {
          setIsPaymentStatusUnavailable(true);
          console.error('Error fetching subscription data:', error);
        }
      } finally {
        if (isCurrentRequest) {
          setIsPaymentStatusResolved(true);
        }
      }
    };

    fetchSubscriptionData();

    return () => {
      isCurrentRequest = false;
    };
  }, [userId]);

  const paymentStatusNote = getPaymentStatusNote({
    hasUserId: Boolean(userId),
    hasSubscription: Boolean(subscriptionData),
    isUnavailable: isPaymentStatusUnavailable,
  });

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
          {isPaymentStatusResolved && (
            <Alert
              type={paymentStatusNote.alertType}
              message={paymentStatusNote.title}
              description={paymentStatusNote.message}
              showIcon
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default View;
