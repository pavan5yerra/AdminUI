const intialState = {
  data: null,
  tempData: null
};
export const Reducer1 = (state = intialState, action) => {
  switch (action.type) {
    case "FETCH": {
      return {
        ...state,
        data: action.data,
        tempData: action.data
      };
    }
    case "FILTER": {
      return {
        ...state,
        data: action.data
      };
    }
    case "DELETE": {
      return {
        ...state,
        data: action.data
      };
    }
    case "EDIT": {
      const index = state.data.findIndex((val) => val.id === action.data.id); //finding index of the item
      const newArray = [...state.data]; //making a new array
      newArray[index] = action.data; //changing value in the new array
      return {
        ...state,
        data: newArray
      };
    }
    default:
      return state;
  }
};
