// eslint-disable-next-line
import {SET_CATEGORY,ADD_CATEGORY,REMOVE_CATEGORY,UPDATE_CATEGORY,RELOAD_CATEGORY} from "./actionTypes";

export var set_category_action = (payload)=>{
  return {
    type:SET_CATEGORY,
    payload:payload
  }
}

export var add_category_action = (payload)=>{
  return {
    type:ADD_CATEGORY,
    payload:payload
  }
}


export var remove_category_action = (payload)=>{
  return {
    type:REMOVE_CATEGORY,
    payload:payload
  }
}

export var update_category_actions = ()=>{
  return {
    type:UPDATE_CATEGORY
  }
}

export var reload_category_actions = ()=>{
  return {
    type:RELOAD_CATEGORY
  }
}
