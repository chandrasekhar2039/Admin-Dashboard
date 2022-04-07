import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux"

import { toast } from 'react-toastify';


import {fetch_category} from "../../Redux/MiddleWare/Category/action";
import {reload_category_actions} from "../../Redux/Actions/Category/action"

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CFormText,
  CInputFile,
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import API from "../../API/base"


const AddCategory = ()=>{
  var dispatch = useDispatch();
  var state = useSelector((state)=>state.categoryReducer);


  useEffect(()=>{
    if(state.loading){
      dispatch(fetch_category());
    }
 },[])//eslint-disable-line


// hooks
  var [selection,setselection] = React.useState({
    value:[],
    able:true
  });
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

    if(formData.get("category") === "None")
    return toast.error('Category is Required', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });


    if(formData.get("subcategory") === "default")
    formData.delete("subcategory");

    setloading(true);

    try{
      var sendData = await API.post("create_item", formData);

      toast.success('Item Added', {
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
      dispatch(reload_category_actions());
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


// for option category and subCategory display handeling
  var categorySelect=(e)=>{
    var value =parseInt(e.target.value);
    var subcatData = state.category;
    for(let i=0;i<subcatData.length;i++){
      if(subcatData[i].id=== value && subcatData[i].sub_categories.length !==0 )
        return setselection({...selection, able:false, value:subcatData[i].sub_categories});
        setselection({...selection, able:true, value:[]})
    }
  }


  return (

    <>
      { loading ? <div className="loader ">Loading...</div> : <CCard>

        <CCardHeader>
          <div className="d-flex justify-content-center">
            <h4>Add Item</h4>
          </div>
        </CCardHeader>

        <CForm className="form-horizontal" id="formAdd" onSubmit={submit} encType="multipart/form-data">

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="name" placeholder="Name of Item" autoComplete="off" required/>
                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Category</CLabel>
              </CCol>
              <CCol xs="12" md="9">

                <select className="Category-sel custom-select" id="select" name="category" required onChange={categorySelect} >
                  <option key="0" value="None" >Please select</option>
                  {state.category.map((each,index)=>{
                    return   <option key={index} value={each.id}>{each.name}</option>
                  })}
                </select>

                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Sub Category</CLabel>
              </CCol>
              <CCol xs="12" md="9">

                <select className="custom-select" id="select" name="subcategory" disabled={selection.able}>
                  <option key={0} value="default">Please select</option>
                  {selection.value.map((each,index)=>{
                    return <option key={index} value={each.id}>{each.name}</option>
                  })}
                </select>
                {/* <CFormText className="help-block pl-2">Required</CFormText> */}
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="file-input">Upload Image</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="uploadIMG" id="file-input"  type='file' name="image"  accept="image/x-png,image/gif,image/jpeg" onChange={selectfile}  />
                <CTooltip  content="accepts .png and .jpg image, image size should be less than 1mb"><label htmlFor="file-input" className="btn btn-light" >Choose a file</label></CTooltip> <span>{fileSeclect}</span>
                <CFormText className="help-block pl-2">Required</CFormText>

              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Price</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="number" name="price" placeholder="Price in Rupees" autoComplete="off" required />
                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Discount %</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="number" name="discount_percentage" placeholder="Discount in percentage" autoComplete="off"  max="100"/>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="description"
                  id="textarea-input"
                  rows="6"
                  placeholder="Description of item"
                  required
                />
                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>
          </CCardBody>

          <CCardFooter className="d-flex justify-content-end">
            <CButton type="submit" size="sm" color="success" className="mr-1" ><CIcon name="cil-scrubber"  /> Submit</CButton>
            <CButton type="reset" size="sm" color="danger" className="ml-1" onClick={reset}><CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>

        </CForm>

      </CCard> }

    </>

  )
}

export default AddCategory;
