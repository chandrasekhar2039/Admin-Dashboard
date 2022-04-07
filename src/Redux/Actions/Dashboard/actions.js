const FETCH = "FETCH";


export var fetch_action = (payload)=>{

  return {
    type:FETCH,
    payload:payload
  }
}
