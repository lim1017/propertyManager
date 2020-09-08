// import React from "react";

// const value = React.createContext({});

// export default value 


import React, { useReducer } from "react";

export default (reducer, actions, initalState) => {
  const Context = React.createContext();
  console.log(initalState)
  
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    // actions === {addBlog, editBlog etc}
    const boundActions = {};
    for (let key in actions){
      boundActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider value={{ state, dispatch, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider }
};
