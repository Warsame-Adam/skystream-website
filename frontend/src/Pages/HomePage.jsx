import React from "react"
import Navbar from "../Components/Navbar/Navbar"
import SearchBar from "../Components/SearchBar/SearchBar"
import CalandarLayout from "../Components/CalandarLayout"
import PopularFlights from "../Components/PopularFlights/PopularFlights"
import TrendingCities from "../Components/TrendingCities/TrendingCities"


const HomePage = () => {

    return (
        <>
        <Navbar />
        <SearchBar />
        <CalandarLayout />
        <PopularFlights />
        <TrendingCities />
        </>
    )
}

export default HomePage