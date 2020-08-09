const SET_DATA = "SET_DATA";
const SET_DATE = "SET_DATE";
const SET_EDU_ANSWERS = "SET_EDUCATION_ANSWERS"
const SET_EDU_PROGRESS = "SET_EDU_PROGRESS"
const SET_USER = "SET_USER";


export default function reducerz(state, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        number: action.number,
        letter: action.letter
      };
    case SET_DATE:
      return {
        ...state,
        date: action.date
      }; 
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_DATA,
  SET_DATE,
  SET_EDU_ANSWERS,
  SET_EDU_PROGRESS,
  SET_USER
};
