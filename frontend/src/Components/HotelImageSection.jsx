import React, { useState } from "react";
import { Box, Modal, Grid, IconButton, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ImageGridItem = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

const HotelImageSection = ({ hotel }) => {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const allImages = [hotel.cover, ...hotel.images];

  const handleOpen = (index) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImageIndex(null);
  };

  return (
    <Box sx={{ width: "100%", height: "400px", overflow: "hidden", mt: 2 }}>
      <Grid container spacing={1} sx={{ height: "100%" }}>
        {/* Left big image */}
        <Grid item xs={6} sx={{ height: "100%" }}>
          <ImageGridItem onClick={() => handleOpen(0)} sx={{ height: "100%" }}>
            <img
              src={hotel.cover}
              alt={hotel.name}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </ImageGridItem>
        </Grid>

        {/* Right 4 small images */}
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Grid container spacing={1} sx={{ height: "100%" }}>
            {hotel.images.slice(0, 4).map((image, index) => (
              <Grid key={index} item xs={6} sx={{ height: "50%" }}>
                <ImageGridItem
                  onClick={() => handleOpen(index + 1)}
                  sx={{ height: "100%", position: "relative" }}
                >
                  {hotel.images.length > 4 && index === 3 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        padding: "4px 12px",
                      }}
                    >
                      <Typography variant='subtitle1' align='center'>
                        +{hotel.images.length - 4}
                      </Typography>
                    </div>
                  )}
                  <img
                    src={image}
                    alt={`Hotel image ${index + 1}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageGridItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Modal for viewing large image */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Grid container alignItems='center' wrap='nowrap'>
            <Grid item>
              <IconButton
                disabled={selectedImageIndex === 0}
                onClick={() => {
                  if (selectedImageIndex > 0) {
                    setSelectedImageIndex((s) => s - 1);
                  }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <img
                src={allImages[selectedImageIndex]}
                alt={`Selected`}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item>
              <IconButton
                disabled={selectedImageIndex === allImages.length - 1}
                onClick={() => {
                  if (selectedImageIndex < allImages.length - 1) {
                    setSelectedImageIndex((s) => s + 1);
                  }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default HotelImageSection;

