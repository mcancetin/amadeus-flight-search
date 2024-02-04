import React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import dayjs from 'dayjs';
import * as Yup from "yup";
import axios from "./api/axios";
import { useFormik } from "formik";

import useFetch from './hooks/useFetch';

import { Header } from './components/layout/header';
import { FlightList } from './components/flight-list';
import { Searchbar } from './components/common/searchbar';



const now = dayjs();

const initialValues = {
  oneWayFlight: false,
  departure: "",
  arrival: "",
  departureDate: now,
  returnDate: now.add(1, "day"),
};

const validationSchema = Yup.object().shape({
  departure: Yup.object().required(),
  arrival: Yup.object().required(),
  departureDate: Yup.date().required(),
  returnDate: Yup.date(),
  oneWayFlight: Yup.boolean(),
});

const formatDate = (date) => date.format("YYYY-MM-DD");

function App() {
  const [flights, setFlights] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: allFlights, loading: flightsLoading } = useFetch(`/flights?_sort=${filterType}`);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { departure, arrival, departureDate, returnDate, oneWayFlight } = values;
      setLoading(true);
      try {
        let response;
        if (oneWayFlight) {
          response = await axios.get(
            `/flights?departure=${departure.code}&arrival=${arrival.code}&departureDate=${formatDate(departureDate)}&oneWayFlight=${oneWayFlight}`,
          );
        } else {
          response = await axios.get(
            `/flights?departure=${departure.code}&arrival=${arrival.code}&departureDate=${formatDate(departureDate)}&dateOfReturn=${formatDate(returnDate)}`,
          );
        }

        setFlights(response.data);
        setLoading(false);
      } catch (error) { }
    },
  });

  useEffect(() => {
    if (allFlights) {
      setFlights(allFlights)
      setLoading(flightsLoading)
    }
  }, [allFlights, flightsLoading])

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl">
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12}>
            <Searchbar formik={formik} />
          </Grid>

          <Grid item xs={12}>
            <FlightList flights={flights} setFilterType={setFilterType} loading={loading} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App;
