import './App.css'
import axios from 'axios'
import './index.css'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/productDetails'

//Test taiwind
import LoginTest from './components/user/LoginTest'
import RegisterTest from './RegisterTest'

//Cart Import
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

//Auth or user import
import Login from './components/user/Login.jsx'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

//Admin import
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrderList'
import ProcessOrder from './components/admin/ProcessOrder'
import UserList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'

//Order import
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

import { useEffect as UseEffect, useState } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'

//Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {
  const [stripeApikey, setStripeApiKey] = useState('')

  UseEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get(process.env.REACT_APP_URL_SERVER + '/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()
  }, [])

  const { user, loading } = useSelector(state => state.auth)
  return (
    <Router>
      <div className="relative h-screen min-h-screen">
        <Header />
        {/* test */}
        <Route path="/logintest" exact component={LoginTest} />
        <Route path="/registertest" exact component={RegisterTest} />
        {/* test */}


        <Route path="/" exact component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" exact component={ProductDetails} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/password/forgot" exact component={ForgotPassword} />
        <Route path="/password/reset/:token" exact component={NewPassword} />

        <Route path="/cart" exact component={Cart} />
        <ProtectedRoute path="/shipping" exact component={Shipping} />
        <ProtectedRoute path="/orders/confirm" component={ConfirmOrder} />
        <ProtectedRoute path="/success" exact component={OrderSuccess} />

        {
          stripeApikey &&
          <Elements stripe={loadStripe(stripeApikey)}>
            <ProtectedRoute path="/payment" exact component={Payment} />
          </Elements>
        }

        <ProtectedRoute path="/me" exact component={Profile} />
        <ProtectedRoute path="/me/update" exact component={UpdateProfile} />
        <ProtectedRoute path="/password/update" exact component={UpdatePassword} />

        <ProtectedRoute path="/orders/me" exact component={ListOrders} />
        <ProtectedRoute path="/order/:id" exact component={OrderDetails} />

        <ProtectedRoute path="/dashboard" isAdmin={true} exact component={Dashboard} />
        <ProtectedRoute path="/admin/products" isAdmin={true} exact component={ProductsList} />
        <ProtectedRoute path="/admin/product" isAdmin={true} exact component={NewProduct} />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} exact component={UpdateProduct} />
        <ProtectedRoute path="/admin/orders" isAdmin={true} exact component={OrdersList} />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} exact component={ProcessOrder} />
        <ProtectedRoute path="/admin/users" isAdmin={true} exact component={UserList} />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} exact component={UpdateUser} />
        <ProtectedRoute path="/admin/reviews" isAdmin={true} exact component={ProductReviews} />

        {/* {!loading && user && user.role !== 'admin' && (
          <Footer />
        )} */}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
