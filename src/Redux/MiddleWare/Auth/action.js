import {set_auth_action,remove_auth_action} from "../../Actions/Auth/action";
import API from "../../../API/base";

export var login_middleware=(data)=>{
  return async (dispatch)=>{
    try{
      const response = await API.post("rest-auth/login/",data);
      dispatch(set_auth_action(response.data.key));
      return response.data;
    }catch(error){
      return(error.response);
    }
  }
}

export var logout_middleware=()=>{
  return async (dispatch)=>{
    // server call and will delete the token
    try{
      const out = await API.post("rest-auth/logout/");
      dispatch(remove_auth_action());
      return true;
    }catch(e){
      return false;
    }
  }
}
