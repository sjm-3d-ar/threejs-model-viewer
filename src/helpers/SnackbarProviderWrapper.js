import React, { createRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { SnackbarProvider } from "notistack";

const SnackbarProviderWrapper = ({ children }) => {
  const notistackRef = createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      action={key => (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClickDismiss(key)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      hideIconVariant={false}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarProviderWrapper;
