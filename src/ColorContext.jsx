import { createContext, useState, useContext } from 'react';

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [bgColor, setBgColor] = useState('#f5f7fa');

  return (
    <ColorContext.Provider value={{ bgColor, setBgColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  return useContext(ColorContext);
}