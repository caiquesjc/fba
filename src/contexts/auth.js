import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState();

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [state, setState] = useContext(AuthContext);
  return [state, setState];
};

export default AuthContext;
