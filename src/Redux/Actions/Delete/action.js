export var delReq=(payload)=>{
  return {
    type:"To_DELETE",
    payload:payload
  }
}

export var delReset=()=>{
  return {
    type:"RESET"
  }
}
