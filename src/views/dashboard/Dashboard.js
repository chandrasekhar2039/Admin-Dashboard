import React,{useEffect} from 'react'
import {
  CCardGroup,
  CCardFooter,
  CCol,
  CLink,
  CRow,
  CWidgetProgress,
  CWidgetIcon,
  CWidgetProgressIcon,
  CWidgetSimple,
  CProgress,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import {fetch} from "../../Redux/MiddleWare/Dashboard/action"
const Dashboard = () => {
  var dispatch = useDispatch();
  var state = useSelector(state => state.dashboard);

  useEffect(()=>{
    dispatch(fetch());
  },[])//eslint-disable-line

  return (
    <> {state.loading ? <div className="loader ">Loading...</div> :
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress color="success" header={`${state.data.total_items}`} text="Total Items">
            <CProgress color="success" animated size="xs" className="my-3" value={100}/>
            <Link to="/additems"><CButton  color="success" className="" >Add Items</CButton> </Link>
          </CWidgetProgress>
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress color="info" header={`${state.data.total_categories}`} text="Total Category" >
            <CProgress color="info" animated size="xs" className="my-3" value={100}/>
            <Link to="/addcategory"><CButton  color="info" className="" >Add Category</CButton> </Link>
          </CWidgetProgress>
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetProgress color="warning" header={`${state.data.total_subcategories}`} text="Total Sub categories">
            <CProgress color="warning" animated size="xs" className="my-3" value={100}/>
            <Link to="/editcategory"><CButton  color="warning" className="" >Add Sub Category</CButton> </Link>
          </CWidgetProgress>
        </CCol>

      </CRow>

      {/* <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CButton type="submit"  color="success" className="" >Update</CButton>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="info" variant="inverse" header="12.124" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="warning" variant="inverse" header="$98.111,00" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="danger" variant="inverse" value={95} header="2 TB" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>

      </CRow> */}
    </>
    }
    </>
  )
}

export default Dashboard
