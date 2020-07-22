import React, { useState } from "react";
import PropTypes from "prop-types";

const ModalToggle = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {content(hide, isShown)}
    </>
  );
};

ModalToggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};

export default ModalToggle;
