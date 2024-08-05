
import { useRoutes} from 'react-router-dom';
import routes from '@/router/Index.tsx'

function App() {
  const outlet = useRoutes(routes)
  return (
    <>
      <div className='App'>
        {/* <Link to="/home">Home</Link>|
        <Link to="/about">About</Link> */}
        {outlet}
      </div>
    </>
  )
}

export default App
