var init = {
  IsAuth:false,
  Token:""
}

var Authreducer =(state=init, {type,payload})=>{
  switch(type){
    case "AUTHENTICATE":
    {
      localStorage.setItem('token', payload); // will store the data in localstorage
      return {...state , IsAuth:true, Token:payload}
    }
    case "NOT_AUTHENTICATE":{
      localStorage.removeItem("token");// will remove the localstorage data
      return {...state, IsAuth:false, Token:""}
    }
    default:
    return{...state}
  }
}

export default Authreducer;
