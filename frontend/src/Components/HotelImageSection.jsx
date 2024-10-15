import React, { useState } from 'react';
import { Box, Modal, Grid } from '@mui/material';
import styled from '@mui/material/styles/styled';
import image1 from "../Components/Assets/image1.png";
import image2 from "../Components/Assets/image2.png";
import image3 from "../Components/Assets/image3.png";
import image4 from "../Components/Assets/image4.png";
import image5 from "../Components/Assets/image5.png";
import image6 from "../Components/Assets/image6.png";

const ImageGridItem = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90%',
  maxHeight: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
};

const images = [
  { src: image1, alt: 'Hotel Image 1', height: '300px' },
  { src: image2, alt: 'Hotel Image 2', height: '400px' },
  { src: image3, alt: 'Hotel Image 3', height: '250px' },
  { src: image4, alt: 'Hotel Image 4', height: '500px' },
  { src: image5, alt: 'Hotel Image 5', height: '350px' },

];

const HotelImageSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ width: '100%', height: '400px', overflow: 'hidden', mt: 2 }}>
      <Grid container spacing={1} sx={{ height: '100%',  }}>
        
        <Grid item xs={6} sx={{ height: '100%' }}>
          <ImageGridItem
            onClick={() => handleOpen(images[0].src)}
            sx={{ height: '100%' }}
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </ImageGridItem>
        </Grid>

        
        <Grid item xs={6} sx={{ height: '100%' }}>
          <Grid container spacing={1} sx={{ height: '100%', }}>
            {images.slice(1).map((image, index) => (
              <Grid key={index} item xs={6} sx={{ height: '50%' }}>
                <ImageGridItem
                  onClick={() => handleOpen(image.src)}
                  sx={{ height: '100%' }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                </ImageGridItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Modal>
    </Box>


    
    
  );
};

export default HotelImageSection;