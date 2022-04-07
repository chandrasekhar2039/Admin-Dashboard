import {useEffect} from "react";
import {CRow,CButton} from '@coreui/react'
import {Link} from "react-router-dom"
import Cards from "./cradsProp";

import {fetch_category} from "../../Redux/MiddleWare/Category/action";
import { useSelector, useDispatch } from 'react-redux'

var AllItem =()=>{
  var dispatch= useDispatch();
  var state= useSelector((state)=>state.categoryReducer);
 useEffect(()=>{
   if(state.loading){
     dispatch(fetch_category());
   }
},[])//eslint-disable-line


  return <>
    { state.loading ?
      <div className="loader ">Loading...</div> :
      <>
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

      </>
    }

  </>
}

export default AllItem;
