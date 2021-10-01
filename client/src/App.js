import React, {useEffect} from "react";
import "./index.css";
import {Switch, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import SideDrawer from "./components/drawer/SideDrawer";

import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import ModelCreate from "./pages/admin/model/ModelCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import ModelUpdate from "./pages/admin/model/ModelUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import ModelHome from "./pages/model/ModelHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";

import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import {currentUser} from "./functions/auth";
import Footer from "./components/nav/Footer";
import Header1 from "./components/nav/Header1";

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                // console.log("user", user);

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <body>
        <div className="grid-container">
            <Header/>
            <SideDrawer />
            <ToastContainer />
            <main>
                <Switch>
                    {/*<Route exac t path="/" component={Home} />*/}

                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/register/complete" component={RegisterComplete}/>
                    <Route exact path="/forgot/password" component={ForgotPassword}/>
                    <UserRoute exact path="/user/history" component={History}/>
                    <UserRoute exact path="/user/password" component={Password}/>
                    <UserRoute exact path="/user/wishlist" component={Wishlist}/>
                    <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
                    <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
                    <AdminRoute exact path="/admin/model" component={ModelCreate}/>
                    <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
                    <AdminRoute exact path="/admin/model/:slug" component={ModelUpdate}/>
                    <AdminRoute exact path="/admin/sub" component={SubCreate}/>
                    <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate}/>
                    <AdminRoute exact path="/admin/product" component={ProductCreate}/>
                    <AdminRoute exact path="/admin/products" component={AllProducts}/>
                    <AdminRoute
                        exact
                        path="/admin/product/:slug"
                        component={ProductUpdate}
                    />
                    <Route exact path="/katalog/:slug" component={Product}/>
                    <Route exact path="/category/:slug" component={CategoryHome}/>
                    <Route exact path="/car/:slug" component={ModelHome}/>
                    <Route exact path="/sub/:slug" component={SubHome}/>
                    <Route exact path="/shop" component={Shop}/>
                    <Route exact path="/cart" component={Cart}/>
                    <UserRoute exact path="/checkout" component={Checkout}/>
                    <AdminRoute exact path="/admin/coupon" component={CreateCouponPage}/>
                    <UserRoute exact path="/payment" component={Payment}/>
                </Switch>
            </main>
            <Footer/>
        </div>
        </body>
    );
};

export default App;