import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Table from "@mui/material/Table"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import TableContainer from "@mui/material/TableContainer"
import CircularProgress from "@mui/material/CircularProgress"

import RestartAltIcon from "@mui/icons-material/RestartAlt"
import EastOutlinedIcon from "@mui/icons-material/EastOutlined"
import MultipleStopOutlinedIcon from "@mui/icons-material/MultipleStopOutlined"

import useFilterContext from "../../hooks/use-filter-context"
import axios from "../../api/axios"

const initialValues = {
  price: "outlined",
  flightTime: "outlined",
  departureTime: "outlined",
  returnTime: "outlined"
}

const createChipViewState = (activeKey) => {
  return {
    price: activeKey === "price" ? "filled" : "outlined",
    flightTime: activeKey === "flightTime" ? "filled" : "outlined",
    departureTime: activeKey === "departureTime" ? "filled" : "outlined",
    returnTime: activeKey === "returnTime" ? "filled" : "outlined"
  }
}

function FlightList() {
  const [filterType, setFilterType] = useState("id")
  const [chipView, setChipView] = useState(initialValues)

  const {
    filters: {
      search: { departure, arrival, departureDate, returnDate, oneWayFlight }
    }
  } = useFilterContext()

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url)
        setFlights(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching flights:", error)
        setLoading(false)
      }
    }

    if (departure && arrival) {
      const endpoint = oneWayFlight
        ? `/flights?departure=${departure.code}&arrival=${
            arrival.code
          }&departureDate=${departureDate.format(
            "YYYY-MM-DD"
          )}&oneWayFlight=${oneWayFlight}&_sort=${filterType}`
        : `/flights?departure=${departure.code}&arrival=${
            arrival.code
          }&departureDate=${departureDate.format(
            "YYYY-MM-DD"
          )}&returnDate=${returnDate.format(
            "YYYY-MM-DD"
          )}&oneWayFlight=${oneWayFlight}&_sort=${filterType}`

      fetchData(endpoint)
    } else {
      fetchData(`/flights?_sort=${filterType}`)
    }
  }, [departure, arrival, departureDate, returnDate, oneWayFlight, filterType])

  if (loading) {
    return (
      <Box textAlign="center" p={2}>
        <CircularProgress />
      </Box>
    )
  }

  const handleReset = () => {
    setFilterType("id")
    setChipView(initialValues)
  }

  const handleSort = (sortBy) => {
    setFilterType(sortBy)
    setChipView(createChipViewState(sortBy))
  }

  return (
    <>
      <h2>Flights</h2>
      <Stack
        direction="row"
        spacing={1}
        m={1}
        justifyContent="flex-end"
        alignItems="center"
      >
        <IconButton size="small" onClick={handleReset} color="info">
          <RestartAltIcon fontSize="12px" />
        </IconButton>
        <Typography variant="subtitle2" color="GrayText">
          Sort By:
        </Typography>
        <Chip
          label="Price"
          variant={chipView.price}
          color="info"
          onClick={() => handleSort("price")}
        />
        <Chip
          label="Flight Time"
          variant={chipView.flightTime}
          color="info"
          onClick={() => handleSort("flightTime")}
        />
        <Chip
          label="Departure Time"
          variant={chipView.departureTime}
          color="info"
          onClick={() => handleSort("departureTime")}
        />
        <Chip
          label="Return Time"
          variant={chipView.returnTime}
          color="info"
          onClick={() => handleSort("returnTime")}
        />
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: 480 }}>
        {flights.length > 0 ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Departure</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Arrival</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Return Time</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Flight Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // Demo nedeniyle json-server kullandım. Bu yüzden boolean değerler string olarak geliyor.
                flights.map((flight) => {
                  const {
                    oneWayFlight,
                    departure,
                    arrival,
                    departureTime,
                    departureDate,
                    returnDate,
                    returnTime,
                    price,
                    currency,
                    flightTime
                  } = flight
                  return (
                    <TableRow key={flight.id}>
                      <TableCell>{departure}</TableCell>
                      <TableCell>
                        {oneWayFlight === "true" ? (
                          <EastOutlinedIcon />
                        ) : (
                          <MultipleStopOutlinedIcon />
                        )}
                      </TableCell>
                      <TableCell>{arrival}</TableCell>
                      <TableCell>
                        {departureDate} {departureTime}
                      </TableCell>
                      <TableCell>
                        {returnDate} {returnTime}
                      </TableCell>
                      <TableCell>
                        {price} {currency}
                      </TableCell>
                      <TableCell>{flightTime} minutes</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        ) : (
          <Box textAlign="center" p={2}>
            No flight found
          </Box>
        )}
      </TableContainer>
    </>
  )
}

FlightList.propTypes = {
  flights: PropTypes.array
}

export default FlightList
