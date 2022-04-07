import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useHistory} from "react-router-dom"

const Page500 = () => {
  var history = useHistory();

  var returnHome =()=>{
    history.push("/")
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">500</h1>
              <h4 className="pt-3">Dear user, we have a problem!</h4>
              <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
            </span>

          </CCol>
        </CRow>
        <CRow className="align-items-center d-flex justify-content-center mt-1">
        <button className="btn btn-info btn-lg" onClick={returnHome}>Back to home</button>
          </ CRow>
      </CContainer>
    </div>
  )
}

export default Page500
