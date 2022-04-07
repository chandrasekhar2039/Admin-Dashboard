const init ={
  category:[],
  loading:true
};


var categoryReducer = (state=init,{type,payload})=>{
switch (type){
  case "SET_CATEGORY":
    return {...state,category:payload,loading:false }
  case "ADD_CATEGORY":{
    state.category.push(payload);
    return {...state}
  }
  case "REMOVE_CATEGORY":{
    var newCAT=state.category.filter((each)=>{
      return each.id !== parseInt(payload);
    })
  return {...state, category:newCAT};
  }
  case "UPDATE_CATEGORY":{
    return {...state,loading:true }
  }
  case "RELOAD_CATEGORY":
  return {...state, loading:true}
  default:
  return state
}
}


export default categoryReducer;
