import React,{useEffect} from 'react';
import { toast } from 'react-toastify';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CFormText,
  CInputFile,
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import API from "../../API/base"


const AddCarousel = ()=>{

// hooks
  var [fileSeclect, setfile] = React.useState('');
  var [loading,setloading] = React.useState(false);


// img select display
var selectfile =(e)=>{
  var input = e.target.files[0].name !== undefined ? e.target.files[0].name : ''
  input.length > 15 && (input = input.substr(0, 16) + "...")
  setfile(input);
}

// on submit handeling
  var submit =async (e)=>{
    e.preventDefault();

    var form = document.forms.formAdd;
    var formData = new FormData(form);

    if(fileSeclect === '')
    return toast.error('Image is Required', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    setloading(true);

    if(formData.get("text") === "")
    formData.delete("text");

    try{
      var sendData = await API.post("corousel_list", formData);

      toast.success('Carousel Added', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      // console.log(sendData);
      setloading(false);
    }catch(e){

      toast.error('Something went wrong, Try again', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

      setloading(false);
      // console.log(e.response);
    }


      reset();

  }

// on Reset handeling
  var reset = (e)=>{
  document.getElementById("formAdd").reset();
  setfile("")
}

  return (

    <>
      { loading ? <div className="loader ">Loading...</div> : <CCard>

        <CCardHeader>
          <div className="d-flex justify-content-center">
            <h4>Add Carousel</h4>
          </div>
        </CCardHeader>

        <CForm className="form-horizontal" id="formAdd" onSubmit={submit} encType="multipart/form-data">

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Carousel Heading</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="text" placeholder="Heading" autoComplete="off" required/>
                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="file-input">Upload Image</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="uploadIMG" id="file-input"  type='file' name="image"  accept="image/x-png,image/jpeg" onChange={selectfile}  />
                <CTooltip  content="accepts .png and .jpg image, image size should be less than 1mb"><label htmlFor="file-input" className="btn btn-light" >Choose a file</label></CTooltip> <span>{fileSeclect}</span>
                <CFormText className="help-block pl-2">Required</CFormText>

              </CCol>
            </CFormGroup>
          </CCardBody>

          <CCardFooter className="d-flex justify-content-end">
            <CButton type="submit" size="sm" color="success" className="mr-1" ><CIcon name="cil-scrubber"  /> Upload</CButton>
            <CButton type="reset" size="sm" color="danger" className="ml-1" onClick={reset}><CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>

        </CForm>

      </CCard> }

    </>

  )
}

export default AddCarousel;
