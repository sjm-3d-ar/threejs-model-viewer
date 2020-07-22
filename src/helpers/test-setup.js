/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { theme, SnackbarProviderWrapper } from "_helpers";

//
// Set up a custom render, to include ThemeProvider
// example: https://testing-library.com/docs/react-testing-library/setup#custom-render
//

const ProviderWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProviderWrapper>{children}</SnackbarProviderWrapper>
    </ThemeProvider>
  );
};

const renderWithTheme = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithTheme as render };
