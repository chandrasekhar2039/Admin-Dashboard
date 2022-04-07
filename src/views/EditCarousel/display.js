import React,{useEffect} from 'react';
import API from "../../API/base"
import CarouselCard from "./child"
import {useHistory,Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
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

import {delReset} from "../../Redux/Actions/Delete/action";
import { toast } from 'react-toastify';

var DisplayCarousel = ({match})=>{
  var history=useHistory();
  var dispatch= useDispatch();
  var delState = useSelector((state)=>state.toDelete);
  const [reload, Setreload]= React.useState(false);
  const [loading, setload]=React.useState(true);
  const [data,setdata]= React.useState([]);


useEffect(()=>{
  var getdata= async()=>{
    try{
      var list = await API.get("corousel_list");
      // console.log(list.data);
      if(loading){
        setdata(list.data);
        setload(false);
      }
    }catch(e){
      // console.log(e.response);
      return e.response;
    }
  }

getdata();

},[reload ])//eslint-disable-line

var yesDeleteItem =async()=>{
  // api request to delete
  await API.delete(`corousel_detail/${delState.value}/`);
  dispatch(delReset());
  toast.success('Item deleted', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
  setload(true);
  Setreload(!reload);
}

return (<>
  {loading ? <div className="loader ">Loading...</div> :

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
          Item and its following data will be removed permentaly and can't be recovered. Proceed if you are sure.
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={yesDeleteItem}>Delete</CButton>{' '}
          <CButton color="secondary" onClick={() => dispatch(delReset())}>Cancel</CButton>
        </CModalFooter>
      </CModal>

      <div className="mb-3">
        <span>Total number of Carousel : <b>{data.length}</b></span>
      </div>

      {data.length >0 ?
        <CRow className="text-center">
          {data.map((each, index)=>{
            return <CarouselCard key={index} prop={each}/>
          }) }
        </CRow>
      :
      <>
        <div className="p-2 m-2 row">
          <h1>No Carousel </h1>
        </div>
        <div className="p-2 m-2 row">
          <Link to="/addcarousel" ><CButton color="primary">Add Carousel</CButton> </Link>
        </div>
      </>}

    </>
  }
</>)
};

export default DisplayCarousel;
