// eslint-disable-next-line
import {set_category_action,remove_category_action,add_category_action,update_category_actions} from "../../Actions/Category/action"

import API from "../../../API/base"

export var fetch_category = ()=>{
return async (dispatch)=>{
try{
  var fetchData= await API.get("category_list");
  dispatch(set_category_action(fetchData.data));
}catch(e){
console.log(e);
}
}
}


export var add_category = (payload, formdata)=>{
  return async(dispatch)=>{
    try{
var categoryAddResponse = await API.post("category_list",formdata);
      // for sub cat
      try{
      let len = payload.sub_categories.length;
      for(let i=0;i< len; i++){
        var subpost = await API.post("add_sub_category_list/",{
          name:payload.sub_categories[i],
          category:categoryAddResponse.data.id
        });
      categoryAddResponse.data.sub_categories.push(subpost.data)
      }
      }catch(e){
        return ({status:400});
      }
      dispatch(add_category_action(categoryAddResponse.data));
      return {status:200};
    }catch (e){
      return {status:400};
    }
  }
}

export var remove_category = (payload)=>{
  return async (dispatch)=>{
    try{
      var reqDel = await API.delete(`category_detail/${payload}/`);
      dispatch(remove_category_action(payload));
      return true;
    }catch(e){
      console.log(e.response);
      return false;
    }
  }
}

export var update_category =(payload, formdata)=>{
  return async (dispatch)=>{
    try{
      if(payload.add.length !== 0){ // to add the new added sub cat
        for(let i=0;i< payload.add.length; i++){
          var addSubcat = await API.post("add_sub_category_list/",{
            name:payload.add[i],
            category:payload.id
          });
        }
      }

      if(payload.update.length !== 0){// to update sub cat
        for(let i=0;i< payload.update.length; i++){
          var updateSubcat = await API.put(`subcategory-update/${payload.update[i].id}/`,{
            name:payload.update[i].name
          });
        }
      }

      if(payload.delete.length !== 0){// to delete sub cat
        for(let i=0;i< payload.delete.length; i++){
          var deleteSubcat = await API.delete(`sub_category_detail/${payload.delete[i]}/`);
        }
      }

      // to update the cat list
      var updateCat = await API.put(`category-update/${payload.id}/`,formdata)
      dispatch(update_category_actions());
      return ({status:200});
    }catch(e){
      dispatch(update_category_actions());
      return ({status:400});
    }
  }
}
