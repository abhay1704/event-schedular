import { createContext, useState } from "react";

const DataContext = createContext();

export default DataContext;

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
