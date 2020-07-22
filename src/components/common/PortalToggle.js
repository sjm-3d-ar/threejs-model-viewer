import React, { useState } from "react";
import PropTypes from "prop-types";

import Portal from "./Portal";

//
// NOTE: a `div` with id of "app-portal-#" must exist (in _document.js), where
//       '#' is the value of the id prop
//

const PortalToggle = ({ toggle, content, id }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && <Portal id={id}>{content(hide)}</Portal>}
    </>
  );
};

PortalToggle.propTypes = {
  id: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};

export default PortalToggle;
