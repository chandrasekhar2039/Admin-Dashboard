import React from 'react'
import logo from "../../../assets/Logo/logo.svg"
import logoShadow from "../../../assets/Logo/logo_shadow.svg"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CHeaderBrand,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {login_middleware} from "../../../Redux/MiddleWare/Auth/action";
import {useDispatch,useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const Login = () => {
  var dispatch=useDispatch();
  var auth = useSelector((state)=> state.auth.IsAuth);
  const history = useHistory();
  const [log,setlog]= React.useState(true);

  var verify =async (e)=>{

    if (e.key === 'Enter' || e.type === "click" ) {

    if((document.querySelector("#username").value==="" && document.querySelector("#password").value=== "") || (document.querySelector("#username").value=== "" || document.querySelector("#password").value=== "")){
      return (toast.error("Provide username and Password", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }))
    }else {
      setlog(false);

    var credential ={
      username:document.querySelector("#username").value,
      password:document.querySelector("#password").value
    }
  var response = await dispatch(login_middleware(credential));

  // error handing
  if (response.status===400 || response.status===401 ){
    setlog(true);
    toast.error(response.data.non_field_errors !== undefined ? response.data.non_field_errors[0] : `please try again` , {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    // clear input
    document.querySelector("#username").value= '';
    document.querySelector("#password").value='';
  }
else{
  history.push("/dashboard")
}
}
}

  }


  return ( <>
    {/*Error handeling toast*/}
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />

    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" id="username" onKeyDown={verify} required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" id="password" autoComplete="current-password" onKeyDown={verify} required/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <button hidden={!log} type="button" className="btn btn-primary px-4" onClick={verify}>
                          Login
                        </button>
                        <button hidden={log} type="button" className="btn btn-primary px-4">
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" size="sm" className="px-0">Forgot password?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                <img src={logoShadow} alt="logo"  className="img-fluid" style={{ width: '70%' }}/>
                <CHeaderBrand className="mx-auto" to="/">

                </CHeaderBrand>

                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>

</>  )
}

export default Login
