import {fetch_action} from "../../Actions/Dashboard/actions";
import API from "../../../API/base"

export var fetch=()=>{
  return async (dispatch)=>{
    try{
      var data = await API.get("object-count/");
      // localStorage.setItem('dashboard', data.data);
      dispatch(fetch_action(data.data));
      return true;
    }catch(e){
      console.log(e.response);
      return false
    }
  }
}
