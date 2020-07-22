import React from "react";
import { render } from "_helpers/test-setup";

import ToastButton from "../index";

describe("<ToastButton />", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<ToastButton />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should show the ToastButton", () => {
    const { queryByText } = render(<ToastButton />);

    expect(queryByText("Show Toast")).toBeVisible();
  });
});
