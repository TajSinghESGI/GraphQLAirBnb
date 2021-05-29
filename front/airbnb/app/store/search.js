// Action types
const SET_CITY = "SET_CITY";
const SET_START = "SET_START";
const SET_END = "SET_END";
const ADD_ADULT = "ADD_ADULT";
const ADD_CHILD = "ADD_CHILD";
const ADD_INFANT = "ADD_INFANT";

// Action creators
export const setCity = (city) => {
  return (dispatch) => {
    dispatch({
      type: SET_CITY,
      payload: {
        city,
      },
    });
  };
};

const initialStore = {
  city: "",
};

// Reducer
const reducer = (state = initialStore, action) => {
  if (action.type === SET_CITY) {
    return { ...state, city: action.payload.city };
  }
  return state;
};

export default reducer;
