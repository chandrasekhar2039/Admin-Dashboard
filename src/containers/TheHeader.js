import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from "../assets/Logo/logo_shadow.svg";
import {toast } from 'react-toastify';

// routes config
import routes from '../routes';

// actions
import {sidebar_toggler_action} from "../Redux/Actions/SidebarToggler/action";
import {logout_middleware} from "../Redux/MiddleWare/Auth/action";
import {useHistory} from "react-router-dom";


const TheHeader = ({match}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sidebarShow = useSelector(state => state.sidebarToggler.sidebarShow)

  const [log,setlog]= React.useState(true);

  const toggleSidebar = () => {
  const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(sidebar_toggler_action(val));
  }

  const toggleSidebarMobile = () => {
  const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(sidebar_toggler_action(val));
  }

  var authout=async ()=>{
    setlog(false);
  var outres = await  dispatch(logout_middleware());
  if(outres)
    history.push("/login");
    else
    {
      setlog(true);
      toast.error("Please try again !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <div className="mr-5 mt-2">
          <img src={logo} alt="logo" width="55" height="50" className="mr-1" />
          <span className="brandnamemob">BANAHARA</span>
        </div>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        {/* <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem> */}
      </CHeaderNav>


      <CHeaderNav className="px-3 ">
        <button hidden={!log} type="button" className="btn btn-secondary mr-1 d-lg-none btn-sm " onClick={authout}> <CIcon name="cil-account-logout" className="mr-1"  />  Logout</button>
        <button hidden={!log} type="button" className="btn btn-secondary mr-4 d-md-down-none btn-sm " onClick={authout}> <CIcon name="cil-account-logout" className="mr-1"  />  Logout</button>

        <button hidden={log} type="button" className="btn btn-secondary mr-1 d-lg-none btn-sm "> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
        <button hidden={log} type="button" className="btn btn-secondary mr-4 d-md-down-none btn-sm "> <span className="spinner-border spinner-border-sm m-1 p-1" role="status" aria-hidden="true"></span></button>

      </CHeaderNav>


      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
