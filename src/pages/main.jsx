import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '../components/layout/header'
import { Container, Grid } from '@mui/material'
import { Searchbar } from '../components/common/searchbar'
import { FlightList } from '../components/flight-list'

function Main(props) {

    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <Grid container spacing={2} mt={5}>
                    <Grid item xs={12}>
                        <Searchbar />
                    </Grid>

                    <Grid item xs={12}>
                        <FlightList />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

Main.propTypes = {}

export default Main
