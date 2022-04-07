import React from 'react';
import {useParams,useHistory,Redirect } from "react-router-dom";
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
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { toast } from 'react-toastify';




//redux middleware
import {update_category} from "../../Redux/MiddleWare/Category/action";
import {useDispatch,useSelector} from "react-redux"



const Child = ()=>{
  var dispatch = useDispatch();
  let history = useHistory();
  var state= useSelector((state)=>state.categoryReducer);
  var rawdata= useSelector(state=> state.categoryReducer.category);
  let { slug } = useParams();
  let data=rawdata.find(each => each.slug === slug);

  // hooks
  const [subItem,setSubItem] = React.useState(data.sub_categories);
  const [subItemADD,setSubItemADD] = React.useState([]);
  const [category, setCategory] = React.useState(data.name);
  const [description, setDescription] = React.useState(data.description);
  const [toUpdate,setUpdate] = React.useState([]);
  const [toDelete,setDelete] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  var [fileSeclect, setfile] = React.useState('');





  var SubItemProp = ({item, index})=>{
    var found = toUpdate.find(each => each.id === item.id);
    var id = item.id !== undefined ? item.id : index;
    var name = item.name !== undefined ? found !== undefined ? found.name : item.name :item;
    return <div className="row ml-0 p-1">
    <div className="col d-flex ml-0 p-0" id={`main ${id}`} >
    <CListGroupItem className={`col-7 ch${id}`} >{name}</CListGroupItem>
    <CButton size="sm" color="info" variant="outline" className="ml-1" onClick={()=> oclickToggle(id)}>
    <CIcon name="cil-pencil"/></CButton>
    <CButton size="sm" color="danger" variant="outline" className="ml-1" onClick={()=> removeSubItem({id, index})}>
    <CIcon name="cil-trash"/></CButton>
    </div>
    <div className="col d-flex ml-0 p-0 hideInput" id={id}>
      <CInput id="text-input" name="text-input" className={`EditsubInput${id} col-7 `} autoComplete="off" defaultValue={name} autoFocus/>
      <CButton size="sm" color="success" className="ml-1" onClick={()=> edit(id)}><CIcon name="cil-check-alt"/></CButton>
      <CButton size="sm" color="dark"  className="ml-1" onClick={()=> oclickToggle(id)}><CIcon name="cil-x"/></CButton>
      </div>
    </div>
  }

  // to add
  var SubItemPropAdd = ({item, index})=>{
    return <div className="row ml-0 p-1"><CListGroupItem className="col-7">{item}</CListGroupItem>
    <CButton  color="light" className="ml-1 p-2" onClick={()=> removeSubItemADD(index)}>
    <CIcon name="cil-x"/></CButton>
    </div>
  }

  var oclickToggle = (id)=>{
    document.getElementById(id).classList.toggle("showInput");
    document.getElementById("main "+id).classList.toggle("hideInput");
  }

var edit =(id)=>{
  var value = document.querySelector(".EditsubInput"+id).value;
  value = value.charAt(0).toUpperCase() + value.slice(1); // to capitalize the 1st letter
  document.querySelector(".ch"+id).innerHTML=value;
  var find = toUpdate.find(each => each.id === id);

  if(find){
    find.name=value;
  } else {
    setUpdate([...toUpdate,{id:id,name:value} ]);
  }

  oclickToggle(id);
}




var descriptionHandel=(e)=>{
  setDescription(e.target.value);
}

var categoryHandel=(e)=>{
  setCategory(e.target.value);
}

  var removeSubItem=({id, index})=>{
    let state = [...subItem]
    state.splice(index,1)
    setSubItem(state);
    setDelete([...toDelete,id]);
  }

  var removeSubItemADD=(index)=>{
    let state = [...subItemADD]
    state.splice(index,1)
    setSubItemADD(state);
  }

  var addSubItem = (e)=>{
    if (e.key === 'Enter' || e.type === "click" ){
      var input = document.querySelector(".subInput").value;
      document.querySelector(".subInput").value=""
      input = input.charAt(0).toUpperCase() + input.slice(1); // to capitalize the 1st letter
      setSubItemADD([...subItemADD, input]);
    }
  }


  var reset = (e)=>{
    setCategory(data.name);
    setDescription(data.description);
    setSubItem([...data.sub_categories]);
    setDelete([]);
    setUpdate([]);
    setSubItem([]);
    setfile('');
  }

  var selectfile =(e)=>{
    var input = e.target.files[0].name !== undefined ? e.target.files[0].name : ''
    input.length > 15 && (input = input.substr(0, 16) + "...")
    setfile(input);
  }

  // on submit
  var submit = async (e)=>{

    if(category === ""){
      var pr=prompt("Category name is Required", data.name);
      if (!pr)
      pr = data.name;
    }


    var dataEntred ={
      id:data.id,
      name:category ? category : pr,
      add:subItemADD,
      delete:toDelete,
      update:toUpdate,
      description:description
    }

    // console.log(dataEntred);

setloading(true);

var form = document.forms.formCat;
var formData = new FormData(form);

// console.log(fileSeclect);

formData.set("name", dataEntred.name);
formData.set("description", dataEntred.description);


// thunk reducer
var res = await dispatch(update_category(dataEntred, formData));


if(res.status === 400){
// if(true){
  toast.error("Certain fields updating Failed 🙁, try again  ", {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
}else {
  toast.success('Category Updated', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
}
forward();
  }

  var forward =()=>{
    setTimeout(()=>  history.push("/editcategory"), 1500);
  }

  return (

    <>

      { loading ? <div className="loader ">Loading...</div> : <CCard>

        <CCardHeader>
          <div className="d-flex justify-content-center">
            <h4>Edit Category</h4>
          </div>
        </CCardHeader>


        <CForm className="form-horizontal" id="formCat" onSubmit={submit} encType="multipart/form-data">

          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Category</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="Category" placeholder="Name goes here" autoComplete="off" required value={category} onChange={categoryHandel} />
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
                <div>
                  {subItemADD.map((item,index)=>{
                    return <SubItemPropAdd item={item} key={index} index={index}/>
                  })}
                </div>
                <div className="d-flex mt-2">
                  <CInput id="text-input" name="text-input" placeholder="Add Sub Category" className="subInput" autoComplete="off" onKeyDown={addSubItem}  />
                  <CButton size="sm" color="primary" className="ml-1"  onClick={addSubItem}><CIcon name="cil-plus" /></CButton>
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
                {/* <CFormText className="help-block pl-2">Required</CFormText> */}

              </CCol>
            </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="Description"
                      id="textarea-input"
                      rows="6"
                      placeholder=""
                      value={description}
                      onChange={descriptionHandel}
                    />
                  </CCol>
                </CFormGroup>
            </CCardBody>

            <CCardFooter className="d-flex justify-content-end">
              <CButton  size="sm" color="success" className="mr-1" onClick={submit} ><CIcon name="cil-scrubber"  /> Done</CButton>
              <CButton type="reset" size="sm" color="danger" className="ml-1" onClick={reset}><CIcon name="cil-ban"/> Reset</CButton>
            </CCardFooter>

            </CForm>

          </CCard> }
    </>

  )
}

export default Child;
