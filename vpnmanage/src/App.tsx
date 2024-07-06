import { useState } from 'react'
import Comp1 from '@/components/index.tsx'
import Comp2 from '@/components2/index.tsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      顶级组件
      <Comp1 />
      <Comp2 />
      </div>
    </>
  )
}

export default App
