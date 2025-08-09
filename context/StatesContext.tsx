"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getStatesAndCities } from "./actions";

type LocationsContextType = {
  getStates: () => any[];
  getStateById: (stateId: number) => any | undefined;
  getCityById: (cityId: number) => any | undefined;
  isLoading: boolean;
  error: string | null;
  getCities: (stateId: number) => any[];
};

const LocationsContext = createContext<LocationsContextType | undefined>(
  undefined
);

export const LocationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [states, setStates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cities = states.reduce((acc, state) => {
    return [...acc, ...state.cities];
  }, [] as any[]);

  useEffect(() => {
    getStatesAndCities().then((response) => {
      if (response.success) {
        setStates(response.states!);
        setIsLoading(false);
      } else {
        setError(response.error || "Failed to fetch states and cities");
        setIsLoading(false);
      }
    });
  }, []);
  const getStates = (): any[] => {
    return states.map(({ cities, ...state }) => state);
  };
  const getCities = (stateId: number): any[] => {
    return states.find((state) => state.id === stateId)?.cities || [];
  };
  const getStateById = (stateId: number): any | undefined => {
    return states.find((state) => state.id === stateId);
  };
  const getCityById = (cityId: number): any | undefined => {
    return cities.find((city: any) => city.id === cityId);
  };

  return (
    <LocationsContext.Provider
      value={{
        getStates,
        getCities,
        getStateById,
        getCityById,
        isLoading,
        error,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }
  return context;
};
