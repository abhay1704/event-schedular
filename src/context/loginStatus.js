import { createContext, useState } from "react";

const AuthContext = createContext({ success: false });

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ success: false });

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser({ success: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
