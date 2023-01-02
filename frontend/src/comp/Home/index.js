import Nav from './Nav';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className="h-screen bg-slate-900 text-white overflow-hidden">
      <Nav />
      <Outlet />
    </div>
  )
}

export default Home