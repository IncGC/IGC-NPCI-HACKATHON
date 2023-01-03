import Nav from './Nav';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Nav />
      <Outlet />
    </div>
  )
}

export default Home