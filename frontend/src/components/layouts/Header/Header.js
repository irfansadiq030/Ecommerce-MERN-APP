import React from 'react'
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";


function Header() {
  return (
    <ReactNavbar
    logo = {logo}
    logoWidth= "5vmax"
    burgerColor = '#eb4034' 
    burgerColorHover="#eb4034"
    nav1justifyContent = 'center'
    nav2justifyContent = 'space-around'
    nav3justifyContent = 'space-around'
    link1Color = '#fff'
    link1Text='Home'
    link2Text='About'
    link3Text='Products'
    link4Text='Contact'
    link5Text='Contact'
    link1Url = '/'
    link2Url = '/about'
    link3Url = '/products'
    link4Url = '/contact'
    cartIconColor= "rgba(35, 35, 35,0.8)"
    />
  )
}

export default Header