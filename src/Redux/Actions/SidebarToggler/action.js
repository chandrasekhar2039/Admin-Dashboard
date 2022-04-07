import {SIDEBAR_TOGGLER_TYPE} from "./actionTypes";

export const sidebar_toggler_action = (payload)=>{
  return {
    type:SIDEBAR_TOGGLER_TYPE,
    payload:payload
  }
};
