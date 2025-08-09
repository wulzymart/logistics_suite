"use client";

import { getStations } from "./actions";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Types

interface StationsContextType {
  // Data
  stations: any[];
  regionalHubs: any[];

  // Loading states
  loading: boolean;
  refreshing: boolean;

  // Error handling
  error: string | null;

  // Actions
  refreshStations: () => Promise<void>;
  getStationById: (id: string) => any | undefined;
  getStationsByParent: (parentId: string | null) => any[];
  getRegionalHubStations: (hubId: string) =>
    | {
      hub: any;
      children: any[];
    }
    | undefined;
  getAllChildStations: (parentId: string) => any[];
  getHubStationsByStationId: (stationId: string) => any[];
  searchStations: (query: string) => any[];

  // Filters
  getActiveStations: () => any[];
  getInactiveStations: () => any[];
  getStationsByState: (stateId: number) => any[];
  getStationsByCity: (cityId: number) => any[];
}

const StationsContext = createContext<StationsContextType | undefined>(
  undefined
);

interface StationsProviderProps {
  children: React.ReactNode;
}

export function StationsProvider({ children }: StationsProviderProps) {
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch stations from API
  const fetchStations = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const { error, success, data: stations } = await getStations();
      if (!success || !stations) {
        throw new Error(error || "Failed to fetch stations");
      }
      setStations(stations);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch stations";
      setError(errorMessage);
      console.error("Error fetching stations:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  // Refresh stations
  const refreshStations = useCallback(async () => {
    await fetchStations(true);
  }, [fetchStations]);

  // Get regional hub stations
  const regionalHubs = React.useMemo(() => {
    return stations.filter(
      (station) => station.is_regional_hub && station.is_active
    );
  }, [stations]);

  // Get station by ID
  const getStationById = useCallback(
    (id: string): any | undefined => {
      return stations.find((station) => station.id === id);
    },
    [stations]
  );

  // Get stations by parent ID
  const getStationsByParent = useCallback(
    (parentId: string | null): any[] => {
      return stations.filter(
        (station) => station.parent_station_id === parentId
      );
    },
    [stations]
  );
  // Get regional hub with all its child stations
  const getRegionalHubStations = useCallback(
    (hubId: string) => {
      const hub = stations.find(
        (station) =>
          station.id === hubId && station.is_regional_hub && station.is_active
      );
      if (!hub) return undefined;
      return {
        hub,
        children: getAllChildStations(hubId),
      };
    },
    [stations]
  );
  const getHubStationsByStationId = useCallback(
    (stationId: string): any[] => {
      const station = getStationById(stationId);
      if (!station) return [];
      let hub: any
      if (station.is_regional_hub) hub = station;
      else hub = getStationById(station.parent_station_id || "")!;
      const hubStations = getAllChildStations(hub.id);
      return [...hubStations, hub];
    },
    [stations]
  );
  const getStationHub = useCallback(
    (stationId: string): any | undefined => {
      const station = getStationById(stationId);
      if (!station) return undefined;
      let hub: any
      if (station.is_regional_hub) hub = station;
      else hub = getStationById(station.parent_station_id || "")!;
      return hub;
    },
    [stations]
  );

  // Get all child stations recursively
  const getAllChildStations = useCallback(
    (parentId: string): any[] => {
      const collectChildren = (currentParentId: string): any[] => {
        const directChildren = stations.filter(
          (station) => station.parent_station_id === currentParentId
        );

        return directChildren;
      };

      return collectChildren(parentId);
    },
    [stations]
  );

  // Search stations
  const searchStations = useCallback(
    (query: string): any[] => {
      if (!query.trim()) return stations;

      const lowercaseQuery = query.toLowerCase();
      return stations.filter(
        (station) =>
          station.name.toLowerCase().includes(lowercaseQuery) ||
          station.code.toLowerCase().includes(lowercaseQuery) ||
          station.address.toLowerCase().includes(lowercaseQuery) ||
          station.email?.toLowerCase().includes(lowercaseQuery) ||
          station.phone?.includes(query)
      );
    },
    [stations]
  );

  // Filter functions
  const getActiveStations = useCallback((): any[] => {
    return stations.filter((station) => station.is_active);
  }, [stations]);

  const getInactiveStations = useCallback((): any[] => {
    return stations.filter((station) => !station.is_active);
  }, [stations]);

  const getStationsByState = useCallback(
    (stateId: number): any[] => {
      return stations.filter((station) => station.state_id === stateId);
    },
    [stations]
  );

  const getStationsByCity = useCallback(
    (cityId: number): any[] => {
      return stations.filter((station) => station.city_id === cityId);
    },
    [stations]
  );

  const contextValue: StationsContextType = {
    // Data
    stations,
    regionalHubs,

    // Loading states
    loading,
    refreshing,

    // Error handling
    error,

    // Actions
    refreshStations,
    getStationById,
    getStationsByParent,
    getRegionalHubStations,
    getAllChildStations,
    searchStations,
    getHubStationsByStationId,
    getActiveStations,
    getInactiveStations,
    getStationsByState,
    getStationsByCity,
  };

  return (
    <StationsContext.Provider value={contextValue}>
      {children}
    </StationsContext.Provider>
  );
}

// Custom hook to use stations context
export function useStations(): StationsContextType {
  const context = useContext(StationsContext);
  if (context === undefined) {
    throw new Error("useStations must be used within a StationsProvider");
  }
  return context;
}

// Additional utility hooks for specific use cases

// Hook for regional hub management
export function useRegionalHubs() {
  const { regionalHubs, getRegionalHubStations, getAllChildStations } =
    useStations();

  const getHubWithChildren = useCallback(
    (hubId: string) => {
      const hub = getRegionalHubStations(hubId);
      if (!hub) return null;

      return {
        hub: hub,
        directChildren: hub.children,
        allChildren: getAllChildStations(hubId),
        totalChildren: getAllChildStations(hubId).length,
      };
    },
    [getRegionalHubStations, getAllChildStations]
  );

  return {
    regionalHubs,
    getHubWithChildren,
    totalHubs: regionalHubs.length,
  };
}

// Hook for station filtering and search
export function useStationFilters() {
  const { searchStations } = useStations();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    activeOnly: false,
    inactiveOnly: false,
    stateId: null as number | null,
    cityId: null as number | null,
    hubsOnly: false,
  });

  const filteredStations = React.useMemo(() => {
    let result = searchQuery ? searchStations(searchQuery) : [];

    if (filters.activeOnly) {
      result = result.filter((station) => station.is_active);
    }

    if (filters.inactiveOnly) {
      result = result.filter((station) => !station.is_active);
    }

    if (filters.stateId) {
      result = result.filter((station) => station.state_id === filters.stateId);
    }

    if (filters.cityId) {
      result = result.filter((station) => station.city_id === filters.cityId);
    }

    if (filters.hubsOnly) {
      result = result.filter((station) => station.is_regional_hub);
    }

    return result;
  }, [searchQuery, filters, searchStations]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredStations,
    clearFilters: () => {
      setSearchQuery("");
      setFilters({
        activeOnly: false,
        inactiveOnly: false,
        stateId: null,
        cityId: null,
        hubsOnly: false,
      });
    },
  };
}
