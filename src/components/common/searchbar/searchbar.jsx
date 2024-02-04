import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";

import DatePicker from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LocalizationProvider from "@mui/x-date-pickers/LocalizationProvider";

import useFetch from "../../../hooks/useFetch";


export default function Searchbar({ formik }) {
  const { data: airports, loading } = useFetch("/airports");

  return (

    <Stack spacing={2} direction="row" alignItems="center">
      <Autocomplete
        loading={loading}
        disablePortal
        name="departure"
        options={airports}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => `${option.name} (${option.code})`}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(formik.touched.departure && formik.errors.departure)}
            label="Departure"
          />
        )}
        value={formik.values.departure || null}
        onChange={(e, value) => formik.setFieldValue("departure", value)}
      />
      <Autocomplete
        loading={loading}
        disablePortal
        name="arrival"
        options={airports}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => `${option.name} (${option.code})`}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(formik.touched.arrival && formik.errors.arrival)}
            label="Arrival"
          />
        )}
        value={formik.values.arrival || null}
        onChange={(e, value) => formik.setFieldValue("arrival", value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Departure date"
          value={formik.values.departureDate}
          onChange={(value) => formik.setFieldValue("departureDate", value)}
        />
        <DatePicker
          label="Date of return"
          value={formik.values.returnDate}
          onChange={(value) => formik.setFieldValue("returnDate", value)}
          disabled={formik.values.oneWayFlight}
        />
      </LocalizationProvider>

      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.oneWayFlight}
              onChange={() =>
                formik.setFieldValue(
                  "oneWayFlight",
                  !formik.values.oneWayFlight,
                )
              }
            />
          }
          label="One way flight"
          labelPlacement="end"
        />
      </Box>

      <Button onClick={formik.handleSubmit} variant="contained">
        Search
      </Button>
    </Stack>
  );
}

Searchbar.propTypes = {
  formik: PropTypes.object.isRequired,
};
