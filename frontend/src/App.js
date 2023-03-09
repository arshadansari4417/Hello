import LoginSignup from './components/login/LoginSignup';
import Home from './components/Home.js'
import About from './components/About.js';
import NotFound from './components/layout/NotFound';
import Contact from './components/Contact.js';
import Profile from './components/login/Profile.js'
import UpdateProfile from './components/login/UpdateProfile.js'
import UpdatePassword from './components/login/UpdatePassword.js'
import ForgotPassword from './components/login/ForgotPassword.js'
import ResetPassword from './components/login/ResetPassword.js'
import UserOptions from './components/UserOptions.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js'
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js'
import OrderSuccess from './components/Cart/OrderSuccess.js'
import MyOrders from './components/Order/MyOrders.js'
import OrderDetails from './components/Order/OrderDetails.js'
import Dashboard from './components/Admin/Dashboard.js'
import ProductList from './components/Admin/ProductList.js'
import NewProduct from './components/Admin/NewProduct.js'
import UpdateProduct from './components/Admin/UpdateProduct.js'
import OrderList from './components/Admin/OrderList.js'
import ProcessOrder from './components/Admin/ProcessOrder.js'
import UsersList from './components/Admin/UsersList.js'
import UpdateUser from './components/Admin/UpdateUser.js'
import ProductReviews from './components/Admin/ProductReviews.js'
import store from './store'
import { useEffect } from "react";
import React from "react";

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import {CheckingProfile,CheckingOrder} from './components/login/CheckingProfile';

function App() {
  const { isAuthenticated, user} = useSelector(state => state.user)

  useEffect(() => {
    store.dispatch(loadUser());
  }, 
  []);
  return (
    <>
      <Router>
         {isAuthenticated && <UserOptions user={user} />}
        <Routes>

          <Route exact path='/process/payment' element={isAuthenticated && <Payment />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/products/:keyword' element={<Products />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/checkinprofile' element={<CheckingProfile />}/>
          <Route exact path='/checkingorder' element={<CheckingOrder />}/>
          <Route exact path='/account' element={<Profile />} />
          <Route exact path='/me/update' element={isAuthenticated && <UpdateProfile />} />
          <Route exact path='/password/update' element={isAuthenticated && <UpdatePassword />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/login/shipping' element={isAuthenticated && <Shipping />} />
          <Route exact path='/order/confirm' element={isAuthenticated && <ConfirmOrder />} />
          <Route exact path='/success' element={<OrderSuccess />} />
          <Route exact path='/orders' element={<MyOrders />} />
          <Route exact path='/order/:id' element={isAuthenticated && <OrderDetails />} />
          <Route exact path='/admin/products' element={isAuthenticated && user.role==="admin" && <ProductList />} />
          <Route exact path='/admin/product' element= {isAuthenticated && user.role==="admin" && <NewProduct />} />
          <Route exact path='/admin/product/:id' element={isAuthenticated && user.role==="admin" && <UpdateProduct />} />
          <Route exact path='/admin/orders' element={isAuthenticated && user.role==="admin" && <OrderList />} />
          <Route exact path='/admin/dashboard' element={isAuthenticated && user.role==="admin" && <Dashboard />} />
          <Route

            exact path="/admin/order/:id"
            element={isAuthenticated && user.role==="admin" && <ProcessOrder />}
          />
          <Route

            exact path="/admin/users"
            element={isAuthenticated && user.role==="admin" && <UsersList />}
          />
          <Route

            exact path="/admin/user/:id"
            element={isAuthenticated && user.role==="admin" && <UpdateUser />}
          />
          <Route

            exact path="/admin/reviews"
            element={isAuthenticated && user.role==="admin" && <ProductReviews />}
          />
          <Route
          path="*"
          element={<NotFound/>}
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
