import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Grid,
  Input,
  
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Popper,
  Autocomplete,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { useSelector, useDispatch } from "react-redux";
import { setDepartureDate, setReturnDate } from "../Slices/dateStore";
import { setActiveInput } from "../Slices/ReusableCalendar";
import { setFrom, setTo, setOtherOptions } from "../Slices/flightSearchSlice";
import { format } from "date-fns";
import ReusableDatePicker from "./ReusableDatePicker";
import HomeTravellersDropDown from "./HomeTravellersDropDown";
import { GlobalContext } from "../../context/GlobalContext";

const ReturnSearchBar = () => {
  const { pathname } = useLocation();
  const { locations } = useContext(GlobalContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenOriginPopup, setIsOpenOriginPopup] = useState(false);
  const originRef = useRef();
  const [isOpenDestinationPopup, setIsOpenDestinationPopup] = useState(false);
  const destinationRef = useRef();
  const [travellersAnchorEl, setTravellersAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const searchType = useSelector((state) => state.search.searchType);

  const { from, to, otherOptions } = useSelector((state) => state.flightSearch);
  const { cabinClass, adults, children } = useSelector(
    (state) => state.travellers
  );

  const travellersLabel = React.useMemo(() => {
    const total = adults + children;
    if (total === 1 && adults === 1) {
      return "1 Adult, " + cabinClass;
    } else {
      return `${total} Travellers, ${cabinClass}`;
    }
  }, [adults, children, cabinClass]);

  const handleClickDepart = (e) => {
    dispatch(setActiveInput("depart"));
    handleClick(e);
  };

  const handleClickReturn = (e) => {
    dispatch(setActiveInput("return"));
    handleClick(e);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    // dispatch(calendarShow());
  };

  useEffect(() => {
    if (pathname !== "/flights/search") {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
      const departure = new Date(
        currentDate.setDate(currentDate.getDate() + 2)
      );
      dispatch(setDepartureDate(departure.getTime()));

      const returnD = new Date(departure);
      returnD.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
      returnD.setDate(departure.getDate() + 5);
      dispatch(setReturnDate(returnD.getTime()));
    }
  }, [dispatch]);

  const formattedDepartureDate = departureDate
    ? format(new Date(departureDate), "dd/MM/yyyy")
    : "";

  const formattedReturnDate = returnDate
    ? format(new Date(returnDate), "dd/MM/yyyy")
    : "";

  const departInputRef = useRef(null);
  const returnInputRef = useRef(null);

  const handleTravellersInputClick = (e) => {
    setTravellersAnchorEl(e.currentTarget);
    //dispatch(setTravellersOpen(true));
  };

  const checkboxes = (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "repeat(2, 0.2fr)", xs: "auto auto" },
        gap: "5px",
        alignItems: "center",
        marginLeft: "10px",
        my: { md: 0, xs: "10px" },
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#626971",
              marginRight: "10px",
              "&.Mui-checked": { color: "#0062e3" },
              "&.MuiButtonBase-root": {
                backgroundColor: "white",
                width: "18px",
                height: "10px",
              },
            }}
          />
        }
        label='Add nearby airports'
        componentsProps={{
          typography: {
            fontSize: "15px",
            color: "white",
            marginRight: "20px",
          },
        }}
        checked={otherOptions.nearbyAirports}
        onChange={(e) =>
          dispatch(
            setOtherOptions({
              ...otherOptions,
              nearbyAirports: e.target.checked,
            })
          )
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#626971",
              marginRight: "10px",
              "&.Mui-checked": { color: "#0062e3" },
              "&.MuiButtonBase-root": {
                backgroundColor: "white",
                width: "18px",
                height: "10px",
              },
            }}
          />
        }
        label='Direct flights only'
        componentsProps={{
          typography: {
            fontSize: "15px",
            color: "white",
            marginRight: "20px",
          },
        }}
        checked={otherOptions.direct}
        onChange={(e) =>
          dispatch(
            setOtherOptions({ ...otherOptions, direct: e.target.checked })
          )
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#626971",
              marginRight: "10px",
              "&.Mui-checked": { color: "#0062e3" },
              "&.MuiButtonBase-root": {
                backgroundColor: "white",
                width: "18px",
                height: "10px",
              },
            }}
          />
        }
        label='Other option'
        sx={{ display: "inline-flex" }}
        componentsProps={{
          typography: {
            fontSize: "15px",
            color: "white",
            marginRight: "20px",
          },
        }}
        checked={otherOptions.otherOptions}
        onChange={(e) =>
          dispatch(
            setOtherOptions({ ...otherOptions, otherOptions: e.target.checked })
          )
        }
      />
    </Box>
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Grid
        container
        alignItems='center'
        gap={0.5}
        sx={{ mb: "10px", flexWrap: { md: "nowrap", xs: "wrap" } }}
      >
        <Grid
          item
          sx={{ position: "relative", width: { md: "242px", xs: "100%" } }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              ...inputLableStyle,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsOpenOriginPopup(true);
              originRef.current.click();
            }}
          >
            From
          </Typography>
          <Autocomplete
            readOnly
            fullWidth
            open={isOpenOriginPopup}
            onOpen={() => setIsOpenOriginPopup(true)}
            onClose={() => setIsOpenOriginPopup(false)}
            ref={originRef}
            freeSolo
            options={locations}
            getOptionLabel={(option) =>
              option && option.cityName && option.cityCode
                ? `${option.cityName} (${option.cityCode}) ${option.countryName} (${option.countryCode})`
                : ""
            }
            filterOptions={(options, state) => {
              const inputValue = state.inputValue.trim().toLowerCase();

              if (inputValue === "") {
                return options.slice(0, 5);
              }

              return options.filter(
                (option) =>
                  option.cityName.toLowerCase().includes(inputValue) ||
                  option.cityCode.toLowerCase().includes(inputValue) ||
                  option.countryName.toLowerCase().includes(inputValue) ||
                  option.countryCode.toLowerCase().includes(inputValue)
              );
            }}
            onChange={(event, value) => {
              dispatch(setFrom(value));
            }}
            value={from}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li
                  key={key}
                  {...rest}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                  }}
                >
                  <FlightIcon
                    style={{ color: "#5a5a5a", transform: "rotate(45deg)" }}
                  />
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      {option.cityName} ({option.cityCode})
                    </div>
                    <div style={{ fontSize: "12px", color: "#5a5a5a" }}>
                      {option.countryName} ({option.countryCode})
                    </div>
                  </div>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  readOnly: true,
                  ...params.InputProps,
                  disableUnderline: true,
                  style: {},
                  sx: {
                    ...inputStyle,
                    border: 0,
                  },
                }}
                placeholder='Country, city'
                variant='standard'
                sx={{
                  boxSizing: "border-box",
                  width: "100%",
                  pb: "10.9px",
                  border: "1px solid #ccc",
                  backgroundColor: "background.paper",
                  borderRadius: { md: "10px 0px 0px 10px", xs: "0" },
                  "& .MuiInput-root": {
                    borderRadius: { md: "10px 0px 0px 10px", xs: "0" },
                  },
                  "& .MuiAutocomplete-input": {
                    mt: "-4px",
                    // padding: "0 !important",
                  },
                }}
              />
            )}
            PopperComponent={({ style, ...props }) => (
              <Popper
                {...props}
                style={{
                  ...style,
                  width: "400px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  zIndex: 10,
                }}
              />
            )}
            sx={{
              width: "100%",

              "& .MuiAutocomplete-endAdornment": {
                right: "10px",
                bottom: "30%",
              },
            }}
          />
          {/* <Input
            value={`${from.cityName} (${from.cityCode}), ${from.countryName} (${from.countryCode}) `}
            placeholder='From'
            disableUnderline
            sx={{
              ...inputStyle,
              borderRadius: { md: "10px 0px 0px 10px", xs: "0" },

              width: "100%",
            }}
          /> */}
        </Grid>
        {/* To */}
        <Grid
          item
          sx={{ position: "relative", width: { md: "242px", xs: "100%" } }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              ...inputLableStyle,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsOpenDestinationPopup(true);
              destinationRef.current.click();
            }}
          >
            To
          </Typography>
          <Autocomplete
            fullWidth
            open={isOpenDestinationPopup}
            onOpen={() => setIsOpenDestinationPopup(true)}
            onClose={() => setIsOpenDestinationPopup(false)}
            ref={destinationRef}
            freeSolo
            options={locations}
            getOptionLabel={(option) =>
              option && option.cityName && option.cityCode
                ? `${option.cityName} (${option.cityCode}) ${option.countryName} (${option.countryCode})`
                : ""
            }
            filterOptions={(options, state) => {
              const inputValue = state.inputValue.trim().toLowerCase();

              if (inputValue === "") {
                return options.slice(0, 5);
              }

              return options.filter(
                (option) =>
                  option.cityName.toLowerCase().includes(inputValue) ||
                  option.cityCode.toLowerCase().includes(inputValue) ||
                  option.countryName.toLowerCase().includes(inputValue) ||
                  option.countryCode.toLowerCase().includes(inputValue)
              );
            }}
            onChange={(event, value) => {
              dispatch(setTo(value));
            }}
            value={to}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li
                  key={key}
                  {...rest}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                  }}
                >
                  <FlightIcon
                    style={{ color: "#5a5a5a", transform: "rotate(45deg)" }}
                  />
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      {option.cityName} ({option.cityCode})
                    </div>
                    <div style={{ fontSize: "12px", color: "#5a5a5a" }}>
                      {option.countryName} ({option.countryCode})
                    </div>
                  </div>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: {},
                  sx: {
                    ...inputStyle,
                    border: 0,
                  },
                }}
                placeholder='Country, city'
                variant='standard'
                sx={{
                  boxSizing: "border-box",
                  width: "100%",
                  pb: "10.9px",
                  border: "1px solid #ccc",
                  backgroundColor: "background.paper",

                  "& .MuiAutocomplete-input": {
                    mt: "-4px",
                    // padding: "0 !important",
                  },
                }}
              />
            )}
            PopperComponent={({ style, ...props }) => (
              <Popper
                {...props}
                style={{
                  ...style,
                  width: "400px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  zIndex: 10,
                }}
              />
            )}
            sx={{
              width: "100%",

              "& .MuiAutocomplete-endAdornment": {
                right: "10px",
                bottom: "30%",
              },
            }}
          />
        </Grid>
        {/* depart */}
        <Grid
          item
          className='date-input'
          sx={{ position: "relative", width: { md: "210px", xs: "100%" } }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              ...inputLableStyle,
              cursor: "pointer",
            }}
            onClick={() => departInputRef.current?.click()}
          >
            Depart
          </Typography>
          <Input
            placeholder='Depart Add date'
            readOnly
            disableUnderline
            sx={{ ...inputStyle, width: "100%" }}
            value={formattedDepartureDate}
            ref={departInputRef}
            onClick={handleClickDepart}
          />
        </Grid>
        {/* return  */}
        <Grid
          item
          className='date-input'
          sx={{ position: "relative", width: { md: "210px", xs: "100%" } }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              ...inputLableStyle,
              cursor: "pointer",
            }}
            onClick={() => returnInputRef.current?.click()}
          >
            Return
          </Typography>
          <Input
            placeholder='Return Add date'
            disableUnderline
            readOnly
            sx={{ ...inputStyle, width: "100%" }}
            value={formattedReturnDate}
            ref={returnInputRef}
            onClick={handleClickReturn}
            disabled={searchType === "oneway"}
          />
        </Grid>
        <ReusableDatePicker
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
          departInputRef={departInputRef}
          returnInputRef={returnInputRef}
        />

        <Grid
          item
          sx={{ position: "relative", width: { md: "210px", xs: "100%" } }}
        >
          <Typography
            variant='subtitle2'
            sx={{
              ...inputLableStyle,
              cursor: "pointer",
              textWrap: "nowrap",
              textOverflow: "ellipsis",
              boxSizing: "border-box",
              width: "100%",
              overflowX: "hidden",
            }}
            // onClick={handleTravellersInputClick}
          >
            Travellers and cabin class
          </Typography>

          <Input
            placeholder='Travellers and cabin class'
            disableUnderline
            readOnly
            sx={{
              ...inputStyle,
              borderRadius: { md: "0px 10px 10px 0px", xs: 0 },
              cursor: "pointer",
              marginRight: "8px",
              width: "100%",
            }}
            onClick={handleTravellersInputClick}
            value={travellersLabel}
          />
          <HomeTravellersDropDown
            anchorEl={travellersAnchorEl}
            handleClose={() => setTravellersAnchorEl(null)}
          />
        </Grid>

        {matchesSM && checkboxes}
        <Grid
          item
          sx={{
            display: "flex",
            width: { md: "unset", xs: "100%" },
            ml: { md: "6px", xs: 0 },
          }}
        >
          <Button
            fullWidth
            variant='contained'
            sx={{ ...searchButtonStyle, textTransform: "none" }}
            onClick={() => {
              const isDate = (val) => !isNaN(new Date(val).getTime());

              if (
                from &&
                from.cityCode &&
                to &&
                to.cityCode &&
                isDate(departureDate) &&
                isDate(returnDate)
              ) {
                let path = `/flights/search?`;

                if (from.countryCode) {
                  path += `originCountry=${from.countryCode}`;
                }
                if (from.cityCode) {
                  path += `&originCity=${from.cityCode}`;
                }
                if (to.countryCode) {
                  path += `&destinationCountry=${to.countryCode}`;
                }
                if (to.cityCode) {
                  path += `&destinationCity=${to.cityCode}`;
                }
                if (departureDate) {
                  const departureD = new Date(departureDate);
                  departureD.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

                  path += `&departureDate=${departureD.getTime()}`;
                }
                if (searchType !== "oneway" && returnDate) {
                  const returnD = new Date(returnDate);
                  returnD.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

                  path += `&returnDate=${returnD.getTime()}`;
                }
                if (cabinClass) {
                  path += `&cabinClass=${cabinClass}`;
                }
                if (adults > 0) {
                  path += `&adults=${adults}`;
                }
                if (children > 0) {
                  path += `&children=${children}`;
                }
                if (otherOptions.direct) {
                  path += `&direct=${otherOptions.direct ? "true" : "false"}`;
                }
                if (searchType === "oneway") {
                  path += `&oneway=true`;
                } else {
                  path += `&oneway=false`;
                }
                navigate(path);
              }
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {!matchesSM && checkboxes}
    </Box>
  );
};

const inputLableStyle = {
  fontWeight: "700",
  position: "absolute",
  color: "#626971",
  px: "16px",
  pt: "15px",
  zIndex: 1,
};

const searchButtonStyle = {
  backgroundColor: "primary.main",
  padding: { md: "23px 20px", xs: "10px" },
  borderRadius: { md: "10px", xs: 0 },
  color: "text.primary",
  "&:hover": { backgroundColor: "#024daf" },
  "&.Mui-disabled": {
    backgroundColor: "primary.main",
    color: "text.primary",
  },
  minWidth: "70px",
};
const inputStyle = {
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "16px",
  p: "16px",
  pt: "33.4px",
  "& input": {
    p: 0,
    height: "unset",
    border: "none",
    lineHeight: "21px",
  },
};
// const inputStyle = {
//   backgroundColor: "background.paper",
//   color: "black",
//   margin: "2px",
//   padding: "20px 15px",
//   "&:focus": {
//     borderColor: "primary.main",
//   },
// };

export default ReturnSearchBar;
