import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import { toast } from 'react-toastify';


import {reload_category_actions} from "../../Redux/Actions/Category/action";

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
  CInputFile
} from '@coreui/react'


import API from "../../API/base"


const EditProp = ({data})=>{
  var dispatch = useDispatch();
  var history = useHistory();
  var state = useSelector((state)=>state.categoryReducer);
// console.log(data);


let founddata = state.category.find(each => each.id === data.category.id)


// hooks
  var [selection,setselection] = React.useState({
    value:founddata.sub_categories,
    able: false
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

    // if(fileSeclect === '')
    // return toast.error('Image is Required', {
    // position: "top-right",
    // autoClose: 5000,
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
    // });


    var subger = formData.get("subcategory");
    if(subger === "Please select" || subger === null)
    formData.set("subcategory", '')

    // for (var value of formData.values()) {
    //    console.log(value);
    // }

    setloading(true);
    dispatch(reload_category_actions());

    try{
      var sendData = await API.put(`item-update/${data.id}/`, formData);

      toast.success('Item Updated', {
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
      history.push("/view/Category")
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


  }

// // on Reset handeling
//   var reset = (e)=>{
//   document.getElementById("formAdd").reset();
//   setfile("")
// }


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
            <h4>Edit Item</h4>
          </div>
        </CCardHeader>

        <CForm className="form-horizontal" id="formAdd" onSubmit={submit} encType="multipart/form-data">

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="name" placeholder="Name of Item" autoComplete="off" required defaultValue={data.name}/>
                <CFormText className="help-block pl-2">Required</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Category</CLabel>
              </CCol>
              <CCol xs="12" md="9">

                <select className="Category-sel custom-select" id="select" name="category" defaultValue={founddata.id} required onChange={categorySelect} >
                  <option key="0" value="Please select" disabled>Please select</option>
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

                <select className="custom-select" id="select" required name="subcategory" defaultValue={data.subcategory && data.subcategory.id } disabled={selection.able}>
                  <option key={0} value="Please select">None</option>
                  {selection.value.map((each,index)=>{
                    return <option key={index} value={each.id}>{each.name}</option>
                  })}
                </select>

              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="file-input">Change Image</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input className="uploadIMG" id="file-input"  type='file' name="image"  accept="image/x-png,image/gif,image/jpeg" onChange={selectfile}  />
                <label htmlFor="file-input" className="btn btn-light" >Choose a file</label> <span>{fileSeclect}</span>


              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Price</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="number" name="price" placeholder="Price in Rupees" autoComplete="off" required  defaultValue={data.price}/>

              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Discount %</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="number" name="discount_percentage" placeholder="Discount in percentage" autoComplete="off" defaultValue={data.discount_percentage} max="100" />
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
                  defaultValue={data.description}
                />

              </CCol>
            </CFormGroup>
          </CCardBody>

          <CCardFooter className="d-flex justify-content-end">
            <CButton type="submit"  color="success" className="mr-1" >Update</CButton>
            {/* <CButton type="reset" size="sm" color="danger" className="ml-1" onClick={reset}><CIcon name="cil-ban"/> Reset</CButton> */}
          </CCardFooter>

        </CForm>

      </CCard> }

    </>

  )
}

export default EditProp;
