import React, { useEffect, useState } from "react";
import {
  Link,
  Input,
  IconButton,
  Select,
  InputLabel,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControl,
  ListItemIcon,
  InputBase,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { styled } from "@mui/material/styles";

const TravellerData = [
  {
    type: "Group Traveller",
    rating: 5,
    review: `Wonderful experience again at Kimpton & Fitzroy hotel London. 
             It was my second stay and I will go back again soon. Highly recommended`,

    reviewDate: "Comment 15 Oct 2024",
  },

  {
    type: "Family traveller",
    rating: 3.5,
    review: `Most of the staff at this hotel are top notch and it's a gorgeous property. 
               But my mornings were miserable.There is supposed to be a coffee shop along with the main breakfast served in the restaurant. 
               On two of the days the cafe was closed and was directed to coffee being served in the bar. 
               On both those days when I entered the room and found the coffee pitcher empty, 
               when I asked for it to be refilled the staff treated my request like I was asking for them for a great important favor that I didn't deserve.
               Final morning, I decided to try the main restaurant and all the hot items on the buffet were cold,
               and the service was terrible. Recommend the hotel but just go off property for coffee and breakfast.`,

    reviewDate: "Comment 10 0ct 2024",
  },

  {
    type: "Solo traveller",
    rating: 3,
    review: `Clean, renovated, good traditional appearance.
            Too crowded and not well organized. Difficult to fit into dining areas. Loud music till late hours. 
            Very tight space in the room which is common for the UK establishments.`,

    reviewDate: "Comment 4 Oct 2024",
  },

  {
    type: "Couple",
    rating: 1,
    review: `Nice hotel but my room was very noisy all night from some pipe outside the window. It was like sleeping in a noisy factory with that sound.
             - so it was absolutely not worth the money spend on a good room on 7th floor. 
             And the reception staff did not bother when I told them about the noisy room.`,

    reviewDate: "Comment 30 Sep 2024",
  },
];

const CustomInput = styled(InputBase)(({ theme }) => ({
  // border: "1px solid #ccc",
  boxSizing: "border-box",
  borderRadius: "8px",
  padding: "5.5px 16px", // Minimal padding to match the compact style
  width: "100%",
  color: "#161616",
  backgroundColor: "#fff",
  boxShadow: "inset 0 0 0 1px #c1c7cf",
  fontSize: "14px",
  lineHeight: "1.5",
  "& .MuiSelect-select": {
    padding: "4px 0", // Vertical padding to align text
    display: "flex",
    alignItems: "center", // Center align text and arrow vertically
  },
  "& .MuiSelect-outlined": {
    paddingRight: "16px !important",
  },
  "& .MuiInputBase-input": {
    padding: "0", // Remove default padding
    textAlign: "left", // Align text to the left side
  },
  "& .MuiSelect-icon": {
    marginLeft: "auto", // Push the arrow to the far right
    width: "18px",
    height: "18px",
    color: "inherit",
    top: "auto",
  },
  "&:hover": {
    borderColor: "black",
  },
}));

const TravellerReviews = () => {
  const [selectedValue, setSelectedValue] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("recommended");

  const handleChange = (event, type) => {
    if (type === "Traveller") {
      setSelectedValue(event.target.value);
    }
    if (type === "Rating") {
      setSelectedRating(event.target.value);
    } else if (type === "Ranking") {
      setSelectedSortOption(event.target.value);
    }
  };

  return (
    <Container className='container' sx={{ pt: { md: "96px", xs: "60px" } }}>
      <Typography
        variant='h6'
        sx={{
          fontSize: { md: "25px", xs: "20px" },
          fontWeight: "bold",
          mb: "15px",
        }}
      >
        Traveller Reviews
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          gap: { md: "0px", xs: "8px" },
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            variant='subtitle1'
            sx={{ color: "#161616", fontWeight: "bold" }}
          >
            Filter by
          </Typography>
          <FormControl sx={{ minWidth: "125px" }}>
            <Select
              value={selectedValue}
              onChange={(e) => handleChange(e, "Traveller")}
              displayEmpty
              input={<CustomInput />}
              renderValue={(selected) => {
                switch (selected) {
                  case "all":
                    return "All travellers";
                  case "couple":
                    return "Couple";
                  case "family":
                    return "Family traveller";
                  case "solo":
                    return "Solo traveller";
                  case "group":
                    return "Group traveller";
                  default:
                    return "Select an option";
                }
              }}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value='all'>
                <ListItemIcon>
                  {selectedValue === "all" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>All travellers</Typography>
              </MenuItem>
              <MenuItem value='couple'>
                <ListItemIcon>
                  {selectedValue === "couple" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Couple</Typography>
              </MenuItem>
              <MenuItem value='family'>
                <ListItemIcon>
                  {selectedValue === "family" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>
                  Family traveller
                </Typography>
              </MenuItem>
              <MenuItem value='solo'>
                <ListItemIcon>
                  {selectedValue === "solo" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Solo traveller</Typography>
              </MenuItem>
              <MenuItem value='group'>
                <ListItemIcon>
                  {selectedValue === "group" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Group traveller</Typography>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "125px" }}>
            <Select
              value={selectedRating}
              onChange={(e) => handleChange(e, "Rating")}
              displayEmpty
              input={<CustomInput />}
              renderValue={(selected) => {
                switch (selected) {
                  case "all":
                    return "Traveller rating";
                  case "excellent":
                    return "Excellent";
                  case "good":
                    return "Good";
                  case "average":
                    return "Average";
                  case "below":
                    return "Below average";
                  default:
                    return "Select an option";
                }
              }}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value='all'>
                <ListItemIcon>
                  {selectedRating === "all" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>
                  Traveller rating
                </Typography>
              </MenuItem>
              <MenuItem value='excellent'>
                <ListItemIcon>
                  {selectedRating === "Excellent" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Excellent</Typography>
              </MenuItem>
              <MenuItem value='good'>
                <ListItemIcon>
                  {selectedRating === "Good" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Good</Typography>
              </MenuItem>
              <MenuItem value='average'>
                <ListItemIcon>
                  {selectedRating === "Average" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Average</Typography>
              </MenuItem>
              <MenuItem value='below'>
                <ListItemIcon>
                  {selectedRating === "below" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Below average</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant='subtitle1'
            sx={{ color: "#161616", fontWeight: "bold" }}
          >
            Sort by
          </Typography>
          <FormControl sx={{ m: 1, minWidth: "125px" }}>
            <Select
              value={selectedSortOption}
              onChange={(e) => handleChange(e, "Ranking")}
              displayEmpty
              input={<CustomInput />}
              renderValue={(selected) => {
                switch (selected) {
                  case "recommended":
                    return "Recommended";
                  case "rating h-l":
                    return "Rating (High to low)";
                  case "rating l-h":
                    return "Rating (low to high)";
                  case "Recent":
                    return "Most recent";

                  default:
                    return "Select an option";
                }
              }}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value='recommended'>
                <ListItemIcon>
                  {selectedSortOption === "recommended" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Recommended</Typography>
              </MenuItem>
              <MenuItem value='rating h-l'>
                <ListItemIcon>
                  {selectedSortOption === "rating h-l" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>
                  Rating (high to low){" "}
                </Typography>
              </MenuItem>
              <MenuItem value='rating l-h'>
                <ListItemIcon>
                  {selectedSortOption === "rating l-h" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>
                  Rating (low to high)
                </Typography>
              </MenuItem>
              <MenuItem value='recent'>
                <ListItemIcon>
                  {selectedSortOption === "recent" ? (
                    <RadioButtonCheckedIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <Typography sx={{ color: "black" }}>Most recent</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{ my: 5, borderColor: "grey.300", borderWidth: "1.5px" }} />

      <Box>
        {TravellerData.map((Traveller, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "0.5fr 2fr" }, // Column layout on mobile (xs), grid on larger screens (sm)
                // gridTemplateColumns: "0.5fr 2fr",
                gridTemplateRows: "auto auto",
                gap: { md: 2, xs: 1 },
                width: "100%",
              }}
            >
              <Box
                sx={{
                  //gridColumn: "1",
                  // gridRow: "1 / span 2",
                  gridColumn: { xs: "1", sm: "1" }, // Full width on mobile, same grid placement on larger screens
                  gridRow: { xs: "auto", sm: "1 / span 2" },
                  justifySelf: "start",
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  {Traveller.type}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: "grey" }}>
                  {Traveller.reviewDate}
                </Typography>
              </Box>

              <Box
                sx={{
                  //gridColumn: "2",
                  //gridRow: "1 / span 2",
                  gridColumn: { xs: "1", sm: "2" }, // Full width on mobile, second column on larger screens
                  gridRow: { xs: "auto", sm: "1 / span 2" },
                  justifySelf: "start",
                }}
              >
                <Typography sx={{ fontSize: "12.5px", mb: { md: 2, xs: 1 } }}>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {Traveller.rating}
                  </span>
                  /5
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  {Traveller.review}
                </Typography>
              </Box>
            </Box>

            {index < TravellerData.length - 1 && (
              <Divider
                sx={{ my: 5, borderColor: "grey.300", borderWidth: "0.2px" }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
};

export default TravellerReviews;
