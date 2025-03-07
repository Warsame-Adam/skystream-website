import React, { useEffect, useContext } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GlobalContext } from "../../context/GlobalContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function LoginModal({ open, handleClose }) {
  const { user: globaluser } = useContext(GlobalContext);
  const [formType, setFormType] = React.useState("login");

  useEffect(() => {
    if (globaluser) {
      handleClose();
    }
  }, [globaluser]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <DialogContent sx={{ p: "32px" }}>
        <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {formType === "login" && (
          <LoginForm
            onSuccess={handleClose}
            onSignupClick={() => {
              setFormType("signup");
            }}
          />
        )}
        {formType === "signup" && (
          <SignupForm
            onSuccess={handleClose}
            onLoginClick={() => {
              setFormType("login");
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
