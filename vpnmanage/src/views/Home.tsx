import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/store';

type RootState = ReturnType<typeof store.getState>;

const Home = () => {

  const dispatch = useDispatch();

  const changeNum = () => {
    dispatch({
      type: 'add2',
      val: 10,
    });
  };

  return (
    <div>
      home component
    </div>
  );
};

export default Home;