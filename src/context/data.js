import { createContext, useState } from "react";

const DataContext = createContext();

export default DataContext;

export const EventContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <EventContext.Provider value={{ events, setEvents }}>
        {children}
      </EventContext.Provider>
    </DataContext.Provider>
  );
};