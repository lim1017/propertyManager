import propertyAPI from "../../apis/propertyManagerAPI";
import createDataContext from "../useContext";
import { sortObj, sortObjUnit, sortObjTenant } from "../../helperFunctions";

export const SET_DATA = "SET_DATA";
export const SET_COMPANY = "SET_COMPANY";
export const SET_PROPERTIES = "SET_PROPERTIES";
export const SET_TENANTS = "SET_TENANTS";
export const SET_LOADING = "SET_LOADING";
export const SET_ACTIVE_COMPANY = "SET_ACTIVE_COMPANY";
export const SET_USER = "SET_USER";
export const SET_UNITS = "SET_UNITS";
export const SET_TODO = "SET_TODO";


export default function reducerz(state, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
      };
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
    case SET_UNITS:
      return {
        ...state,
        units: action.units,
      };
    case SET_TODO:
      return {
        ...state,
        todo: action.todo,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export const setTodo = (dispatch) => {
  return async (toDoList) => {
    await dispatch({ type:SET_TODO, todo: toDoList})

  };
};

export const fetchData = (dispatch) => {
  return async (state) => {
    const user = await propertyAPI.get("/users");
    await dispatch({ type: SET_USER, user: user.data[0] });

    const userID = user.data[0].user_id;
    const companies = await propertyAPI.get(`/companies/${userID}`);

    const sortedCompanies = companies.data.sort(sortObj);

    await dispatch({
      type: SET_COMPANY,
      company: sortedCompanies,
      activeCompany: state.activeCompany
        ? state.activeCompany
        : companies.data[0].name,
    });
  };
};

export const editUser = (dispatch) => {
  return async (userId) => {
    await propertyAPI.patch("/users");
    // await dispatch({ type: SET_USER, user: user.data[0] });
  };
};

export const fetchActiveUser = (dispatch) => {
  return async (userId) => {
    const user = await propertyAPI.get("/users");
    await dispatch({ type: SET_USER, user: user.data[0] });
  };
};

export const createProperty = (dispatch) => {
  return async (propertyDetails, activeCompanyId) => {
    await propertyAPI.post("/property/create", {
      ...propertyDetails,
      activeCompanyId,
    });
  };
};

export const fetchProperties = (dispatch) => {
  return async (activeCompany) => {
    const properties = await propertyAPI.get(
      `/properties/${activeCompany[0].company_id}`
    );
    dispatch({ type: SET_PROPERTIES, properties: properties.data });
  };
};

export const editProperty = (dispatch) => {
  return async (PropertyDetails, userId) => {
    await propertyAPI.patch(`/property/edit/${PropertyDetails.Property_id}`, {
      ...PropertyDetails,
      userId,
    });
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
    await propertyAPI.patch(`/company/edit/${companyDetails.company_id}`, {
      ...companyDetails,
      userId,
    });
  };
};



export const createUnit = (dispatch) => {
  return async (unitDetails, propertyId) => {
    const response = await propertyAPI.post("/unit/create", {
      ...unitDetails,
      propertyId,
    });
  };
};

export const editUnit = (dispatch) => {
  return async (unitDetails, unitId) => {
    await propertyAPI.patch(`/unit/edit/${unitId}`, {
      ...unitDetails,
      unitId,
    });
  };
};

export const fetchUnits = (dispatch) => {
  return async (propertyId) => {
    const units = await propertyAPI.get(`/units/${propertyId}`);
    const sortedUnits = units.data.sort(sortObjUnit);
    await dispatch({ type: SET_UNITS, units: sortedUnits });
  };
};

export const createTenant = (dispatch) => {
  return async (tenantDetails, unitId) => {
    const response = await propertyAPI.post("/tenant/create", {
      ...tenantDetails,
      unitId,
    });
  };
};

export const editTenant = (dispatch) => {
  return async (tenantDetails, userId) => {
    await propertyAPI.patch(`/tenant/edit/${tenantDetails.tenant_id}`, {
      ...tenantDetails,
      userId,
    });
  };
};


export const fetchTenants = (dispatch) => {
  return async (unitId) => {
    // const tenants = await propertyAPI.get(`/tenants/${unitId}`);
    const tenants = await propertyAPI.get(`/tenants`);

    const sortedTenants = tenants.data.sort(sortObjTenant);
    await dispatch({ type: SET_TENANTS, tenants: sortedTenants });
  };
};

export const setActiveCompany = (dispatch) => {
  return async (activeCompany) => {
    dispatch({ type: SET_ACTIVE_COMPANY, activeCompany: activeCompany });
  };
};


export const fetchIssues = (dispatch) => {
  return async (userId) => {
    const companies = await propertyAPI.get(`/issues/${userId}`);
    await dispatch({ type: SET_COMPANY, company: companies.data });
  };
};

export const createIssue = (dispatch) => {
  return async (companyDetails, userId) => {
    await propertyAPI.post("/company/create", { ...companyDetails, userId });
  };
};

export const editIssue = (dispatch) => {
  return async (companyDetails, userId) => {
    await propertyAPI.patch(`/company/edit/${companyDetails.company_id}`, {
      ...companyDetails,
      userId,
    });
  };
};


export const { Context, Provider } = createDataContext(
  reducerz,
  {
    fetchCompanies,
    createCompany,
    fetchActiveUser,
    fetchProperties,
    editProperty,
    editCompany,
    setActiveCompany,
    fetchData,
    createProperty,
    createUnit,
    editUnit,
    fetchUnits,
    createTenant,
    fetchTenants,
    editTenant,
    setTodo
  },
  {user: {user_id: 1}}
);
