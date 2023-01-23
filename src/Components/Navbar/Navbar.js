import React, {useState} from 'react';
import "./Navbar.css"
import { Badge, Tooltip } from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InstagramIcon from '@mui/icons-material/Instagram';
import StoreLogo from "../../images/jay.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet, Link } from "react-router-dom";
// import { Cart } from '@chec/commerce.js/features/cart';

const theme = createTheme({
    palette: {
        badge: {
            main: '#EEC865',
        },
    }
});


function Navbar({changeStoreStatus, storeStatus, isStoreOpen, totalItems}) {

const [clicked, setClicked] = useState(false)
function handleClick() {
    setClicked(!clicked)
}
  return (
    <div>
        <nav className="navbar-container">
            <a className="nav-logo-div">
                <img src={StoreLogo} className="nav-logo" />
                <div className="nav-title">
                    <h4>JAY'S</h4>
                    <h4>EPIC</h4>
                    <h4>EATS</h4>
                </div>
            </a>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}>
                    {clicked ? <FaTimes /> : <FaBars />}
                </i>
            </div>
            <ul className="nav-main-links-web">
                <li><Link style={{textDecoration: "none", color: "white"}} to="/">MENU</Link></li>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/about">ABOUT</Link></li>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/contact">CONTACT</Link></li>
            </ul>
            <ul className={clicked ? "nav-main-links-mobile active" : "nav-main-links-mobile"}>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/">MENU</Link></li>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/about">ABOUT</Link></li>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/contact">CONTACT</Link></li>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/">ORDER NOW</Link></li>
                <li><Link style={{textDecoration: "none", color: "white"}} to="/login">LOGIN</Link></li>
            </ul>
            <ul className="nav-social-links">
                <li><a href="https://www.facebook.com" target="__blank"><FacebookIcon sx={{fontSize: "35px"}} /></a></li>
                <li><a href="https://www.twitter.com" target="__blank"><TwitterIcon sx={{fontSize: "35px"}} /></a></li>
                <li><a href="https://www.instagram.com" target="__blank"><InstagramIcon sx={{fontSize: "35px"}} /></a></li>
            </ul>
            <div className="nav-right">
                <Tooltip title="Login feature is currently availible to admin only. (Still availible for preview in beta)">
                    <button className="login-bttn"><Link style={{textDecoration: "none", color: "#800000"}} to="/login">LOGIN</Link></button>
                </Tooltip>
                <button className={isStoreOpen ? "order-now-open" : "order-now-closed"}><Link style={{textDecoration: "none", color: "#800000"}} to="/">ORDER NOW</Link></button>
                <Badge color="error" badgeContent={totalItems}>
                    <Link to="/cart">
                        <ShoppingCartIcon sx={{color: "white", fontSize: "40px", margin: "auto 5px auto 5px"}}/>
                    </Link>
                </Badge>
            </div>
        </nav>

        <Outlet />
    </div>
  )
}

export default Navbar