import propertyAPI from "../../apis/propertyManagerAPI";
import createDataContext from "../useContext";

export const SET_DATA = "SET_DATA";
export const SET_COMPANY = "SET_COMPANY";
export const SET_PROPERTIES = "SET_PROPERTIES";
export const SET_TENANTS = "SET_TENANTS";
export const SET_LOADING = "SET_LOADING";
export const SET_ACTIVE_COMPANY = "SET_ACTIVE_COMPANY";
export const SET_USER = "SET_USER";


export default function reducerz(state, action) {
  switch (action.type) {
    case SET_DATA: 
      return {
        ...state
      }
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_COMPANY:
      return {
        ...state,
        company: action.company,
        activeCompany: action.activeCompany,
      };
    case SET_ACTIVE_COMPANY:
      return {
        ...state,
        activeCompany: action.activeCompany,
      };
    case SET_PROPERTIES:
      return {
        ...state,
        properties: action.properties,
      };
    case SET_TENANTS:
      return {
        ...state,
        tenants: action.tenants,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export const fetchData = (dispatch) => {
  return async (userId) => {

  }
}



export const fetchActiveUser = (dispatch) => {
  return async (userId) => {
      const user = await propertyAPI.get("/users");
      await dispatch({ type: SET_USER, user: user.data[0] });
  };
};

export const fetchProperties = (dispatch) => {
  return async (activeCompany) => {
    const properties = await propertyAPI.get(`/properties/${activeCompany[0].company_id}`);
    dispatch({ type: SET_PROPERTIES, properties: properties.data });
  };
};



export const fetchCompanies = (dispatch) => {
  return async (userId) => {
    const companies = await propertyAPI.get(`/companies/${userId}`);
    await dispatch({ type: SET_COMPANY, company: companies.data });
  };
};

export const createCompany = (dispatch) => {
  return async (companyDetails, userId) => {
    await propertyAPI.post("/company/create", { ...companyDetails, userId });
  };
};

export const editCompany = (dispatch) => {
  return async (companyDetails, userId) => {

    console.log(companyDetails)

    await propertyAPI.patch(`/company/edit/${companyDetails.company_id}`, { ...companyDetails, userId });
  };
};

export const setActiveCompany = (dispatch) => {
  return async (activeCompany) => {
    dispatch({ type: SET_ACTIVE_COMPANY, activeCompany: activeCompany });

  };
};


export const { Context, Provider } = createDataContext(
  reducerz,
  { fetchCompanies, createCompany, fetchActiveUser, fetchProperties, editCompany, setActiveCompany, fetchData },
  {}
);
