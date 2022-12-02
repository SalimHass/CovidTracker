import './App.css';
import Home from '../component/home/Home'
import Navbar from '../component/navbar/Navbar'
import { Outlet } from 'react-router';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Outlet/>
     
   
    </div>
  );
}

export default App;
