//hook function
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {

//get data from store
const {num} = useSelector((state) => 
({num:state.num}))

  return (
    <div>
      home component
      <p>{num}</p>
      <Button onClick={changeNum}>change number</Button>
    </div>
  )
}

export default Home
