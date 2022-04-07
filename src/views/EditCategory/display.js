import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux"

import {fetch_category} from "../../Redux/MiddleWare/Category/action";

import Child from "./Child"


const EditCat = ()=>{
  var dispatch = useDispatch();
  var state= useSelector((state)=>state.categoryReducer);

  useEffect(()=>{
    if(state.loading){
      dispatch(fetch_category());
    }
 },[])//eslint-disable-line

 if(state.loading)
return <div className="loader ">Loading...</div>

return <Child />
}

export default EditCat;
