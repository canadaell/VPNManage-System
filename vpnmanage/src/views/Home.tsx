//hook function
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/store/types';


const Home = () => {

//get data from store
const { num } = useSelector((state: AppState) => ({ num: state.num }));
const dispatch = useDispatch();
//change number by useDispatch
const changeNum = () => {
  dispatch({
    type: 'add',
    num: 10,
  });
}

return (
  <div>
    home component
    <p>{num}</p>
    <Button onClick={changeNum}>change number</Button>
  </div>
);
};

export default Home
