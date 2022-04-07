// import CIcon from '@coreui/icons-react';
import {useEffect,useState} from "react";
import {Link} from "react-router-dom"
//actions
import {delReq,delReset} from "../../Redux/Actions/Delete/action";
import {remove_category} from "../../Redux/MiddleWare/Category/action";
import {fetch_category} from "../../Redux/MiddleWare/Category/action";
import { useSelector, useDispatch } from 'react-redux'

import Cards from "./cardProp";

import {  toast } from 'react-toastify';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'

var EditCategories =()=>{
  var dispatch= useDispatch();
  var state= useSelector((state)=>state.categoryReducer);
  var delState = useSelector((state)=>state.toDelete);

 useEffect(()=>{
   if(state.loading){
     dispatch(fetch_category());
   }
},[])//eslint-disable-line


var yesDelete =async (e) => {
    var respond = await dispatch(remove_category(delState.value));
    if(respond){
      toast.success('Category deleted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    }else{
      toast.error('Something went wrong Please try again !', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
      dispatch(delReset());
}


  return <>

    { state.loading ? <div className="loader ">Loading...</div> :
    <>
      <CModal
        show={delState.trigger}
        onClose={() => dispatch(delReset())}
        color="danger"
      >
        <CModalHeader closeButton>
          <CModalTitle>Are you Sure ?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Category and its related Sub Category along with its Items will be deleted.Once deleted this action can't be undone.
          So Proceed accordingly
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={yesDelete}>Delete</CButton>{' '}
          <CButton color="secondary" onClick={() => dispatch(delReset())}>Cancel</CButton>
        </CModalFooter>
      </CModal>
      {state.category.length > 0 ?
        <CRow className="text-center">
          {state.category.map((each, index)=>{
            return <Cards prop={each} key={index}/>
          })}
        </CRow> :
        <>
          <div className="p-2 m-2 row">
            <h1>No Category </h1>
          </div>
          <div className="p-2 m-2 row">
            <Link to="/addcategory" ><CButton color="primary">Add Category</CButton> </Link>
          </div>
        </>
      }
    </> }
  </>
}

export default EditCategories;
