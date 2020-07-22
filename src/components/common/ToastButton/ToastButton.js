import React from "react";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

const ToastButton = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = () => {
    enqueueSnackbar("Yay, toast!", { variant: "success" });
  };

  return (
    <Button variant="contained" color="primary" onClick={showToast}>
      Show Toast
    </Button>
  );
};

export default ToastButton;
