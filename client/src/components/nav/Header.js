import React, {useState} from "react";
import {Menu, Badge} from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import firebase from "firebase";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Search from "../forms/Search";

import {Button, Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';


const {SubMenu, Item} = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let {user, cart} = useSelector((state) => ({...state}));

    let history = useHistory();

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return (
        <header className="">
            <div className="header-top">
                <div className="left-white">
                    <a href="" className="avtozap">АВТОЗАПЧАСТИ</a>
                </div>

                <div className="big-logo">
                    <a href="" className="logo">Jeep</a>
                </div>

                <div className="right-white">

                    <Link className="font2" to="/">Войти</Link>

                    <div className="tel-basket">
                        <a href="" className="tel">+7(925)906-04-48</a>
                        <img className="basket" src="/basket1.png" alt=""/>
                    </div>
                </div>

            </div>

            <div className="header-down">
                <Navbar className="navbar" expand="lg">
                    <Navbar.Toggle className="burger" aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="" id="basic-navbar-nav">
                        <Nav className="links-nav me-auto">

                            <Link className="header-link font2" to="/">Главная</Link>
                            <Link className="header-link font2" to="/">Модели</Link>
                            <Link className="header-link font2" to="/">Обвес</Link>
                            <Link className="header-link font2" to="/">Доставка</Link>
                            <Link className="header-link font2" to="/">Контакты</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="search-block">
                    <input type="text" placeholder="Номер детали" className="search-field">

                    </input>
                    <button className="search-button font3">
                        {/*<a className="search-button-text">Поиск</a>*/}
                        <img className="search-button-img" src="/search.png" alt=""/>
                    </button>
                </div>
            </div>


        </header>
        // <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        //   <Item key="home" icon={<AppstoreOutlined />}>
        //     <Link to="/">Home</Link>
        //   </Item>
        //
        //   <Item key="shop" icon={<ShoppingOutlined />}>
        //     <Link to="/shop">Shop</Link>
        //   </Item>
        //
        //   <Item key="cart" icon={<ShoppingCartOutlined />}>
        //     <Link to="/cart">
        //       <Badge count={cart.length} offset={[9, 0]}>
        //         Cart
        //       </Badge>
        //     </Link>
        //   </Item>
        //
        //   {!user && (
        //     <Item key="register" icon={<UserAddOutlined />} className="float-right">
        //       <Link to="/register">Register</Link>
        //     </Item>
        //   )}
        //
        //   {!user && (
        //     <Item key="login" icon={<UserOutlined />} className="float-right">
        //       <Link to="/login">Login</Link>
        //     </Item>
        //   )}
        //
        //   {user && (
        //     <SubMenu
        //       icon={<SettingOutlined />}
        //       title={user.email && user.email.split("@")[0]}
        //       className="float-right"
        //     >
        //       {user && user.role === "subscriber" && (
        //         <Item>
        //           <Link to="/user/history">Dashboard</Link>
        //         </Item>
        //       )}
        //
        //       {user && user.role === "admin" && (
        //         <Item>
        //           <Link to="/admin/dashboard">Dashboard</Link>
        //         </Item>
        //       )}
        //
        //       <Item icon={<LogoutOutlined />} onClick={logout}>
        //         Logout
        //       </Item>
        //     </SubMenu>
        //   )}
        //
        //   <span className="float-right p-1">
        //     <Search />
        //   </span>
        // </Menu>
    );
};

export default Header;


{/*<div className="media h">*/
}
{/*    <a target="_blank"*/
}
{/*       href="https://www.facebook.com/%D0%90%D0%BA%D1%81%D0%B5%D1%81%D1%81%D1%83%D0%B0%D1%80%D1%8B-%D0%B8-%D0%B0%D0%B2%D1%82%D0%BE%D0%B7%D0%B0%D0%BF%D1%87%D0%B0%D1%81%D1%82%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%94%D0%B6%D0%B8%D0%BF%D0%BE%D0%B2-Jeep-628106244057934/">*/
}
{/*        <img src="/socialMedia/facebook (1) 2.png" alt=""/>*/
}
{/*    </a>*/
}
{/*    <a target="_blank" href="https://www.instagram.com/jeep_partt/">*/
}
{/*        <img src="/socialMedia/instagram-logo 2.png" alt=""/>*/
}
{/*    </a>*/
}
{/*    <a target="_blank" href="https://ok.ru/group/58581401534513">*/
}
{/*        <img src="/socialMedia/odnoklassniki-logo 2.png" alt=""/>*/
}
{/*    </a>*/
}
{/*    <a target="_blank" href="https://twitter.com/Jeep_part">*/
}
{/*        <img src="/socialMedia/youtube 3.png" alt=""/>*/
}
{/*    </a>*/
}
{/*    <a target="_blank" href="https://vk.com/part_jeep">*/
}
{/*        <img src="/socialMedia/vk.png" alt=""/>*/
}
{/*    </a>*/
}
{/*    <a target="_blank" href="https://www.youtube.com/channel/UCZv_z-n3a---7V3mYcp0rAQ">*/
}
{/*        <img src="/socialMedia/youtube.png" alt=""/>*/
}
{/*    </a>*/
}
{/*</div>*/
}