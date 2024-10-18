import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageContext = createContext();

export const useAsyncStorage = () => {
  return useContext(AsyncStorageContext);
};

export const AsyncStorageProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("your_key");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load data from AsyncStorage:", error);
    }
  };

  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem("your_key", JSON.stringify(value));
      setData(value);
    } catch (error) {
      console.error("Failed to save data to AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadData(); // Load data on mount
  }, []);

  return (
    <AsyncStorageContext.Provider value={{ data, saveData }}>
      {children}
    </AsyncStorageContext.Provider>
  );
};
