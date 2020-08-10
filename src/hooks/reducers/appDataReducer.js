const SET_DATA = "SET_DATA";
const SET_COMPANY = "SET_COMPANY";
const SET_PROPERTIES = "SET_PROPERTIES";
const SET_TENANTS = "SET_TENANTS";
const SET_LOADING = "SET_LOADING";
const SET_ACTIVE_COMPANY="SET_ACTIVE_COMPANY";


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
    case SET_USER:
      return {
        ...state,
        user: action.user
      };  
    case SET_COMPANY:
      return {
        ...state,
        company: action.company,
        activeCompany: action.activeCompany
      };
    case SET_ACTIVE_COMPANY:
      return {
        ...state,
        activeCompany: action.activeCompany
      };
    case SET_PROPERTIES:
      return {
        ...state,
        properties: action.properties
      }; 
    case SET_TENANTS:
      return {
        ...state,
        tenants: action.tenants
      };   
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_DATA,
  SET_COMPANY,
  SET_TENANTS,
  SET_PROPERTIES,
  SET_USER,
  SET_LOADING,
  SET_ACTIVE_COMPANY
};
