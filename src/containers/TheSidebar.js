import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import logo from "../assets/Logo/logo.svg";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import navigation from "./_nav";

// actions
import {sidebar_toggler_action} from "../Redux/Actions/SidebarToggler/action";


const TheSidebar = () => {

  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarToggler.sidebarShow);




  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(sidebar_toggler_action(val))}
    >

      <div className="container-fluid d-md-down-none">
        <Link className="navbar-brand" to="/dashboard">
          <img src={logo} alt="logo" width="55" height="50" className="d-inline-block mb-2" />
          <span className="brandname p-2 pt-4 ml-2 mt-2">BANAHARA</span>
        </Link>
      </div>


      <div className="d-lg-none mt-4 pt-2"></div>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>

  )


}

export default React.memo(TheSidebar)
