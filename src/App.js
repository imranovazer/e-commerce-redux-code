import ResponsiveGrid from "./components/ResponsiveGrid";
import Layout from './Layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from "./pages/Register";
import './styles/style.scss'
import Cart from "./pages/Cart";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";

function App() {

  return (

    <div className="App">

      <Routes>
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Products" element={<ResponsiveGrid />} />
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/adminOrders" element={<AdminOrders />}></Route>
          </Route>
          <Route path="/" element={<Landing />}></Route>
          <Route exact path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />


        </Route>


      </Routes>

    </div>





  );
}

export default App;
