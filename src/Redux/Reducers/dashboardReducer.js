const init ={
  data:[],
  loading:true,
}

 const dashboardReducer = (state=init , {type, payload})=>{
  switch (type){
    case "FETCH":
    return {...state, data:payload, loading:false};
    default:
    return state
  }
}

export default dashboardReducer;
