import { createContext, useState } from "react";

const COLOR_CODE = {
  work: "#4a90e2",
  personal: "#f5a623",
  urgent: "#d0021b",
  health: "#7ed321",
  social: "#bd10e0",
  learning: "#f8e71c",
  finance: "#50e3c2",
  miscellaneous: "#9b9b9b",
  project: "#417505",
};

const StylingContext = createContext();

export default StylingContext;

export const StylingProvider = ({ children }) => {
  const [colorcode, setColorcode] = useState(COLOR_CODE);

  const addColor = (tag, color) => {
    setColorcode((prev) => ({
      ...prev,
      [tag]: color,
    }));
  };

  const removeColor = (tag) => {
    if (tag in COLOR_CODE) {
      console.error("Cannot remove default color");
      return;
    }

    setColorcode((prev) => {
      const { [tag]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <StylingContext.Provider value={{ colorcode, addColor, removeColor }}>
      {children}
    </StylingContext.Provider>
  );
};
