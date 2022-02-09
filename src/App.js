
import './App.css';
import Homepage from './pages/Homepage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import './stylesheets/layout.css'
import './stylesheets/products.css'
import './stylesheets/authentication.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
         <ToastContainer />
     <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Homepage />}/>
       
        <Route path="/login" exact element={<LoginPage/>} />
          <Route path="/register" exact element={<RegisterPage/>} />
          <Route path="/productinfo/:productid"  exact element={<ProductInfo/>} />
          <Route path="/cart" exact element={<CartPage/>} />
      
     
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
