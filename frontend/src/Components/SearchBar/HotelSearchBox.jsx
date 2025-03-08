import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Typography,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Paper,
  Popper,
  Grid,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FlightIcon from "@mui/icons-material/Flight";
import KingBedIcon from "@mui/icons-material/KingBed";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setOtherOptions } from "../Slices/hotelSearchSlice";
import { format } from "date-fns";
import { setActiveInput } from "../Slices/ReusableCalendar";
import ReusableDatePicker from "../ReusableDatePicker";
import HotelTravellersDropDown from "../HotelTravellersDropDown";
import { GlobalContext } from "../../context/GlobalContext";
import { getHotels } from "../../services/hotel";
const CityHotelsSearchBar = () => {
  const navigate = useNavigate();
  const { locations } = useContext(GlobalContext);
  const departInputRef = useRef(null);
  const returnInputRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const { destination, otherOptions } = useSelector(
    (state) => state.hotelSearch
  );
  const [isOpenDestinationPopup, setIsOpenDestinationPopup] = useState(false);

  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const { rooms, adults, children } = useSelector(
    (state) => state.hotelTravellers
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [travellersAnchorEl, setTravellersAnchorEl] = React.useState(null);
  const [inputValue, setInputValue] = useState("");

  const travellersLabel = useMemo(() => {
    const parts = [];
    if (adults === 1) {
      parts.push("1 Adult");
    } else {
      parts.push(`${adults} Adults`);
    }

    if (children > 0) {
      if (children === 1) {
        parts.push("1 Child");
      } else {
        parts.push(`${children} Children`);
      }
    }

    if (rooms === 1) {
      parts.push("1 Room");
    } else {
      parts.push(`${rooms} Rooms`);
    }

    return parts.join(", ");
  }, [adults, children, rooms]);

  useEffect(() => {
    const searchHotels = async () => {
      const res = await getHotels({ name: inputValue });
      if (res.success) {
        setHotels(res.data);
      }
    };
    if (inputValue && inputValue.length > 0 && destination === null) {
      searchHotels();
    }
  }, [inputValue]);

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

  const handleTravellersInputClick = (e) => {
    setTravellersAnchorEl(e.currentTarget);
  };

  const formattedDepartureDate = departureDate
    ? format(new Date(departureDate), "dd/MM/yyyy")
    : "";

  const formattedReturnDate = returnDate
    ? format(new Date(returnDate), "dd/MM/yyyy")
    : "";

  const destinationOptions = [
    ...locations.map((item) => {
      return {
        ...item,
        type: "city",
      };
    }),
    ...hotels.map((item) => {
      return {
        ...item,
        type: "hotel",
      };
    }),
  ];

  return (
    <>
      <Grid
        container
        alignItems='center'
        sx={{ gap: { md: "0px", xs: "10px" } }}
      >
        <Grid item md={6} xs={12}>
          <label htmlFor='#destination'>
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
              }}
              onClick={() => setIsOpenDestinationPopup(true)}
            >
              Where do you want to stay?
            </Typography>
          </label>
          <Autocomplete
            open={isOpenDestinationPopup}
            onOpen={() => {
              setIsOpenDestinationPopup(true);
            }}
            onClose={() => setIsOpenDestinationPopup(false)}
            id='destination'
            disableUnderline
            freeSolo
            options={destinationOptions}
            getOptionLabel={(option) =>
              option
                ? option.type === "city"
                  ? option.cityName && option.cityCode
                    ? `${option.cityName} (${option.cityCode}) ${option.countryName} (${option.countryCode})`
                    : ""
                  : `${option.name}`
                : ""
            }
            inputValue={inputValue}
            onInputChange={(_, val) => setInputValue(val)}
            onChange={(event, value) => {
              if (value?.type === "hotel") {
                setSelectedHotel(value);
                dispatch(setDestination(null));
              } else if (value?.type === "city") {
                dispatch(setDestination(value));
                setSelectedHotel(null);
              } else {
                dispatch(setDestination(null));
                setSelectedHotel(null);
              }
            }}
            value={selectedHotel ? selectedHotel : destination}
            filterOptions={(options, state) => {
              // const inpVal = state?.inputValue?.trim()?.toLowerCase();
              const val = inputValue;
              if (val === "") {
                return options.slice(0, 5);
              }
              return options.filter((option) =>
                option.type === "hotel"
                  ? option.name?.toLowerCase().includes(val.toLowerCase())
                  : `${option.cityName} (${option.cityCode}) ${option.countryName} (${option.countryCode})`
                      ?.toLowerCase()
                      .includes(val.toLowerCase())
              );
            }}
            renderOption={(props, option) => {
              let IconComp = ApartmentIcon;
              if (option.type === "hotel") IconComp = KingBedIcon;
              if (option.type === "airport") IconComp = FlightIcon;

              const isEmpty = inputValue === "";

              return (
                <li
                  id={option._id}
                  {...props}
                  selected={
                    selectedHotel
                      ? selectedHotel._id === option._id
                      : option?.cityCode === destination?.cityCode
                  }
                  style={{
                    display: "flex",
                    justifyContent: isEmpty ? "flex-start" : "space-between",
                    alignItems: "center",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: "6px", alignItems: "start" }}
                  >
                    <IconComp
                      sx={{
                        color: "#5a5a5a",
                        transform:
                          option.type === "airport" ? "rotate(45deg)" : "none",
                        marginTop: "2px",
                      }}
                    />
                    <Box>
                      {option.type === "hotel" ? (
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "black",
                          }}
                        >
                          {option.name}
                        </Typography>
                      ) : (
                        <>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "13px",
                              color: "black",
                            }}
                          >
                            {option.cityName} ({option.cityCode})
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "black" }}>
                            {option.countryName} ({option.countryCode})
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>

                  {!isEmpty && (
                    <Box
                      sx={{
                        marginLeft: "auto",
                        textAlign: "right",
                        color: "black",
                      }}
                    >
                      {option.type}
                    </Box>
                  )}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                inputProps={{
                  ...params.inputProps,
                  disableUnderline: true,
                  style: {},
                  sx: {
                    ...inputStyle,
                    border: 0,
                  },
                }}
                // onClick={() => setIsOpenDestinationPopup(true)}
                placeholder='Select destination or hotel'
                variant='standard'
                sx={{
                  width: "100%",
                  "& .MuiAutocomplete-input": {
                    borderRadius: { md: "8px 0 0 8px", xs: "8px" },
                  },
                  "& .MuiInputBase-root": {
                    p: 0,
                  },
                }}
              />
            )}
            PaperComponent={(paperProps) => {
              const isEmpty = inputValue === "";
              return (
                <Paper {...paperProps}>
                  {isEmpty && (
                    <Box sx={{ p: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        Popular destinations
                      </Typography>
                    </Box>
                  )}
                  {paperProps.children}
                </Paper>
              );
            }}
            PopperComponent={({ style, ...popperProps }) => (
              <Popper
                {...popperProps}
                anchorEl={inputRef.current}
                placement='bottom-start'
                style={{
                  ...style,
                  width: "590px",
                  maxHeight: "auto",
                  overflowY: "auto",
                  zIndex: 10,
                }}
              />
            )}
            ListboxProps={{
              style: {
                marginTop: "5px",
                display: inputValue === "" ? "grid" : "block",
                gridTemplateColumns:
                  inputValue === "" ? "repeat(2, 1fr)" : "unset",
                gap: "2px",
                padding: "0px 5px 5px 5px",
              },
            }}
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                pr: "0px !important",
              },
              "& .MuiAutocomplete-endAdornment": {
                right: "10px",
                //bottom: "30%",
              },
              "& :before": {
                borderBottom: "none !important",
              },
              "& ::after": {
                borderBottom: "none !important",
              },
            }}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <label htmlFor='#check-in'>
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
              }}
            >
              Check-in
            </Typography>
          </label>

          <Input
            id='check-in'
            value={formattedDepartureDate}
            placeholder='Date'
            disableUnderline
            sx={{
              ...inputStyle,
              width: "100%",

              borderRadius: { md: "0", xs: "8px" },
            }}
            ref={departInputRef}
            onClick={handleClickDepart}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <label htmlFor='#check-out'>
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
              }}
            >
              Check-out
            </Typography>
          </label>
          <Input
            id='check-out'
            value={formattedReturnDate}
            placeholder='Date'
            disableUnderline
            sx={{
              ...inputStyle,
              width: "100%",

              borderRadius: { md: "0", xs: "8px" },
            }}
            ref={returnInputRef}
            onClick={handleClickReturn}
          />
        </Grid>
        <ReusableDatePicker
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
          departInputRef={departInputRef}
          returnInputRef={returnInputRef}
        />
        <Grid item md={3} xs={12} sx={{ position: "relative" }}>
          <label htmlFor='#guest'>
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
              }}
            >
              Guests and rooms
            </Typography>
          </label>
          <Input
            id='guest'
            placeholder='Rooms'
            disableUnderline
            readOnly
            sx={{
              ...inputStyle,
              width: "100%",
              borderRadius: { md: "0 8px 8px 0", xs: "8px" },
            }}
            value={travellersLabel}
            onClick={handleTravellersInputClick}
          />

          <HotelTravellersDropDown
            anchorEl={travellersAnchorEl}
            handleClose={() => setTravellersAnchorEl(null)}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={{ mt: "20px", gap: "10px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            alignItems: { md: "center", xs: "flex-start" },
            width: { md: "unset", xs: "100%" },
            gap: { md: "20px", xs: "10px" },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            Popular Filters:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
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
            label='Free cancellation'
            sx={{
              "&.MuiFormControlLabel-root": {
                margin: 0,
              },
            }}
            componentsProps={{
              typography: {
                fontSize: "15px",
                color: "white",
              },
            }}
            checked={otherOptions.freeCancellation}
            onChange={(e) =>
              dispatch(
                setOtherOptions({
                  ...otherOptions,
                  freeCancellation: e.target.checked,
                })
              )
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
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
            label='4 stars'
            sx={{
              "&.MuiFormControlLabel-root": {
                margin: 0,
              },
            }}
            componentsProps={{
              typography: {
                fontSize: "15px",
                color: "white",
              },
            }}
            checked={otherOptions.fourStar}
            onChange={(e) =>
              dispatch(
                setOtherOptions({
                  ...otherOptions,
                  fourStar: e.target.checked,
                })
              )
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
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
            label='5 stars'
            sx={{
              "&.MuiFormControlLabel-root": {
                margin: 0,
              },
            }}
            componentsProps={{
              typography: { fontSize: "15px", color: "white" },
            }}
            checked={otherOptions.fiveStar}
            onChange={(e) =>
              dispatch(
                setOtherOptions({
                  ...otherOptions,
                  fiveStar: e.target.checked,
                })
              )
            }
          />
        </Box>

        <Grid
          item
          sx={{
            display: "flex",
            width: { md: "unset", xs: "100%" },
          }}
        >
          <Button
            fullWidth
            variant='contained'
            endIcon={<ArrowForwardOutlinedIcon />}
            sx={{ ...searchButtonStyle, textTransform: "none" }}
            onClick={() => {
              const isDate = (val) => !isNaN(new Date(val).getTime());
              if (
                ((destination && destination.cityCode) || selectedHotel) &&
                isDate(departureDate) &&
                isDate(returnDate)
              ) {
                let path = `/hotels`;
                if (
                  destination &&
                  (destination.cityCode || destination.countryCode)
                ) {
                  if (destination.countryCode) {
                    path += `/${destination.countryCode}`;
                  }
                  if (destination.cityCode) {
                    path += `/${destination.cityCode}`;
                  }
                } else if (selectedHotel) {
                  path += `/${selectedHotel.city?.countryCode}/${selectedHotel.city?.cityCode}/${selectedHotel.name}/${selectedHotel._id}`;
                }
                if (departureDate) {
                  path += `?availableFrom=${departureDate}`;
                }
                if (returnDate) {
                  path += `&availableTo=${returnDate}`;
                }
                if (adults > 0) {
                  path += `&adults=${adults}`;
                }
                if (children > 0) {
                  path += `&children=${children}`;
                }
                if (children > 0) {
                  path += `&rooms=${rooms}`;
                }

                if (otherOptions.freeCancellation) {
                  path += `&freeCancellation=${
                    otherOptions.freeCancellation ? "true" : "false"
                  }`;
                }
                if (otherOptions.fourStar) {
                  path += otherOptions.fiveStar ? `&minReview=4` : `&rating=4`;
                } else if (otherOptions.fiveStar) {
                  path += `&rating=5`;
                }

                navigate(path);
              }
            }}
          >
            Search hotels
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const inputLableStyle = {
  fontWeight: "700",
  color: "text.primary",
  pb: "8px",
};

const searchButtonStyle = {
  fontWeight: 700,
  fontSize: "16px",
  backgroundColor: "primary.main",
  padding: "10px 16px",
  borderRadius: { md: "10px", xs: "8px" },
  color: "text.primary",
  "&:hover": { backgroundColor: "#024daf" },
  "&.Mui-disabled": {
    backgroundColor: "primary.main",
    color: "text.primary",
  },
  minWidth: "70px",
};
const inputStyle = {
  boxSizing: "border-box",
  height: "48px",
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "16px",
  "&.MuiAutocomplete-input, input": {
    border: "none !important",
    p: "8px 16px !important",
  },
};
export default CityHotelsSearchBar;
