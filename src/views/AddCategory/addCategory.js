import React from 'react';
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
  CListGroupItem,
  CFormText,
  CInputFile,
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { toast } from 'react-toastify';



//redux middleware
import {add_category} from "../../Redux/MiddleWare/Category/action";

import {useDispatch} from "react-redux"



const AddCategory = ()=>{

  var SubItemProp = ({item, index})=>{
    return <div className="row ml-0 p-1"><CListGroupItem className="col-7">{item}</CListGroupItem>
    <CButton size="sm" color="light" className="ml-1" onClick={()=> removeSubItem(index)}>
    <CIcon name="cil-x"/></CButton>
    </div>
  }




  // hooks
  const [subItem,setSubItem] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  var [fileSeclect, setfile] = React.useState('');

  var dispatch = useDispatch();

  var removeSubItem=(index)=>{
    let state = [...subItem]
    state.splice(index,1)
    setSubItem(state);
  }

  var addSubItem = (e)=>{
      if (e.key === 'Enter' || e.type === "click" ){
      var input = document.querySelector(".subInput").value;
      document.querySelector(".subInput").value=""
      input = input.charAt(0).toUpperCase() + input.slice(1); // to capitalize the 1st letter
      setSubItem([...subItem, input]);
    }
  }

  // img select display
  var selectfile =(e)=>{
    var input = e.target.files[0].name !== undefined ? e.target.files[0].name : ''
    input.length > 15 && (input = input.substr(0, 16) + "...")
    setfile(input);
  }


  var reset = (e)=>{
    document.getElementById("formCat").reset();
    setSubItem([]);
    setfile("");
  }

  var submit =async (e)=>{
    var catName = document.querySelector('[name="name"]').value;
    var des = document.querySelector('[name="description"]').value;

    var form = document.forms.formCat;
    var formData = new FormData(form);


    if(!catName){
      return (toast.error('Category name is Required', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
    }));
    }

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


    var dataEntred ={
      name:catName,
      sub_categories:subItem,
      Description:des
    }
setloading(true);
// thunk reducer
var res= await dispatch(add_category(dataEntred, formData));

if(res.status===400){
// if(true){
  toast.error("Please try again !", {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

setTimeout(()=>{
  setloading(false)
  return reset();
 }, 1000);

}else {
  toast.success('Category Added', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

setTimeout(()=>  {
  setloading(false)
  return reset();
 }, 1500);

}
  }

  return (

    <>


      { loading ? <div className="loader ">Loading...</div> :    <CCard>

        <CCardHeader>
          <div className="d-flex justify-content-center">
            <h4>Add Category</h4>
          </div>
        </CCardHeader>


        <CForm className="form-horizontal" id="formCat" onSubmit={submit} encType="multipart/form-data">

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Category</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="name" placeholder="Name goes here" autoComplete="off" required />
                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Sub-Category </CLabel>
              </CCol>
              <CCol xs="12" md="4">
                <div>
                  {subItem.map((item,index)=>{
                    return <SubItemProp item={item} key={index} index={index}/>
                  })}
                </div>
                <div className="d-flex mt-2">
                  <CInput id="text-input" name="text-input" placeholder="Add Sub Category" className="subInput" autoComplete="off" onKeyDown={addSubItem}  />
                  <CButton size="sm" color="info" className="ml-1"  onClick={addSubItem}><CIcon name="cil-plus" /></CButton>
                </div>
              </CCol>
            </CFormGroup>


            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="file-input">Upload Image</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="uploadIMG" id="file-input"  type='file' name="image"  accept="image/x-png,image/gif,image/jpeg"  onChange={selectfile}  />
                <CTooltip  content="accepts .png and .jpg image, image size should be less than 1mb"><label htmlFor="file-input" className="btn btn-light" >Choose a file</label></CTooltip> <span>{fileSeclect}</span>
                <CFormText className="help-block pl-2">Required</CFormText>

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
                  placeholder="Describe your Category"
                />
              </CCol>
            </CFormGroup>
          </CCardBody>

          <CCardFooter className="d-flex justify-content-end">
            <CButton  size="sm" color="success" className="mr-1" onClick={submit} ><CIcon name="cil-scrubber"  /> Submit</CButton>
            <CButton type="reset" size="sm" color="danger" className="ml-1" onClick={reset}><CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>

        </CForm>

      </CCard> }
    </>

  )
}

export default AddCategory;
