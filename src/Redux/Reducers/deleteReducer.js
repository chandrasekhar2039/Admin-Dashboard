var init ={
  trigger:false,
  value:0
}


var deleteReducer =(state=init, {type,payload})=>{
switch(type){
  case "To_DELETE":
  return {...state, trigger:true, value:payload};
  case "RESET":
  return {...state, trigger:false,value:0};
  default:
  return {...state}
}
}


export default deleteReducer;
