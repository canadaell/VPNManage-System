//hook function
import { useSelector } from 'react-redux'


const Home = () => {
const {num} = useSelector((state) => ({
  num: state.num
}))

  return (
    <div>
      home component
      <p>{num}</p>
    </div>
  )
}

export default Home
