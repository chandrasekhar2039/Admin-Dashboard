import React,{useEffect} from 'react';
import {match} from "react-router-dom";
import API from "../../API/base"
import Child from "./child"
import {useDispatch,useSelector} from "react-redux"
import {fetch_category} from "../../Redux/MiddleWare/Category/action";

const EditItem = ({match})=>{
  var dispatch = useDispatch();
  const [loading, setloading]= React.useState(true);
  const [data,setdata]=React.useState('');
  const {slug} = match.params;

  useEffect(()=>{

    var getitemdata= async(url)=>{
      try{
        var list = await API.get(url);
        await dispatch(fetch_category());
        // console.log(list.data);
        if(loading){
          setdata(list.data);
          setloading(false);
        }
      }catch(e){
        // console.log(e.response);
        return e.response;
      }
    }

    if(loading){
      getitemdata(`item_detail/${slug}/`);
    }
 },[])//eslint-disable-line

 if(loading)
return <div className="loader ">Loading...</div>

return <Child data={data}/>
}

export default EditItem;
