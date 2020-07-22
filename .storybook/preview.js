import React from "react";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { theme, SnackbarProviderWrapper } from "_helpers";

addParameters({
  viewport: { viewports: INITIAL_VIEWPORTS },
});

addDecorator(withKnobs);

const backgroundStyle = {
  background: "lightgray",
  height: "100vh",
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

addDecorator(storyFn => (
  <>
    <div
      style={{
        ...(boolean("Background", true) ? backgroundStyle : {}),
        ...(boolean("Center", true) ? centerStyle : {}),
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProviderWrapper>{storyFn()}</SnackbarProviderWrapper>
      </ThemeProvider>
    </div>
    <div id="app-portal-1" />
    <div id="app-portal-2" />
    <div id="app-portal-3" />
  </>
));

const req = require.context("../src", true, /__tests__\/.*.stories.jsx?/);

configure(req, module);
