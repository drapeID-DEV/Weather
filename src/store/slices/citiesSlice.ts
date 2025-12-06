import { ICity } from "@/shared/types/city.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CitiesState {
    selectedCities: ICity[];
}

const initialState: CitiesState = {
    selectedCities: [],
};

const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        addCity(state, action: PayloadAction<ICity>) {
            state.selectedCities.push(action.payload);
            localStorage.setItem("selectedCities", JSON.stringify(state.selectedCities))
        },
        removeCity(state, action: PayloadAction<string>) {
            const filteredCities: ICity[] = state.selectedCities.filter(city => city.name.toLowerCase() !== action.payload.toLowerCase());
            state.selectedCities = filteredCities;
            localStorage.setItem("selectedCities", JSON.stringify(filteredCities))
        },
        setInitCities(state, action: PayloadAction<ICity[]>) {
            state.selectedCities = action.payload;
        }
    },
});

export default citiesSlice;
export const { addCity, removeCity, setInitCities } = citiesSlice.actions;