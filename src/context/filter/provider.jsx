import { useState } from "react";
import { FilterContext } from "./context";
import dayjs from "dayjs";


export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        search: {
            departure: '',
            arrival: '',
            departureDate: dayjs(),
            returnDate: dayjs().add(1, 'day'),
            oneWayFlight: false,
        }
    });



    console.log(filters);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
}