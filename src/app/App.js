import './App.css';
import Navbar from '../component/navbar/Navbar'
import { Outlet } from 'react-router';
import Footer from '../component/footer/Footer';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Outlet/>
      <Footer/>
      
     
   
    </div>
  );
}

export default App;
