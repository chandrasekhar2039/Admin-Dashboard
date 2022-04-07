const SET_AUTH ="AUTHENTICATE";
const REMOVE_AUTH ="NOT_AUTHENTICATE";

export var set_auth_action =(payload)=>{
  return {
    type:SET_AUTH,
    payload:payload
  }
}

export var remove_auth_action =()=>{
  return {
    type:REMOVE_AUTH
  }
}
