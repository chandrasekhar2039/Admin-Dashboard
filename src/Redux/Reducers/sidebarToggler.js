const initialState = {
  sidebarShow: "responsive"
}

const sidebarTogglerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET':
      return {...state, sidebarShow:payload}
    default:
      return state
  }
};

export default sidebarTogglerReducer;
