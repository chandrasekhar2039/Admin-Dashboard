import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useHistory} from "react-router-dom"


const Page404 = () => {
  var history = useHistory();

  var returnHome =()=>{
    history.push("/dashboard")
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You{'\''}re lost.</h4>
              <p className="text-muted float-left">The page you are looking for was not found.</p>
            </div>
          </CCol>
        </CRow>
        <CRow className="align-items-center d-flex justify-content-center mt-1">
        <button className="btn btn-info btn-lg" onClick={returnHome}>Back to home</button>
          </ CRow>
      </CContainer>
    </div>
  )
}

export default Page404
