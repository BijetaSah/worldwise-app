import { createContext, useContext, useEffect, useReducer } from "react";
// import { type } from "server/reply";

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };

    case "currentCity/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    default:
      return new Error("unique action found");
  }
};

const CitiesContext = createContext();
function CityProvider({ children }) {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    dispatch({ type: "loading" });
    async function fetchCitiesData() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejetcted",
          payLoad: "There's an error fetching cities data",
        });
      }
    }
    fetchCitiesData();
  }, []);

  async function fetchCurrentCityData(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "currentCity/loaded", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There's an error fetching current city data",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There's an error in creating city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payLoad: id });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There's an error in deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        fetchCurrentCityData,
        error,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitesContext was used outside CityProvider");
  return context;
}
export { CityProvider, useCities };
