import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

//
// NOTE: a `div` with id of "app-portal-#" must exist (in _document.js), where
//       '#' is the value of the id prop
//

export default function Portal({ children, id }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(`#app-portal-${id}`);
    setMounted(true);
  }, [id]);

  // prettier-ignore
  return mounted
    ? createPortal(
      <div className="modal-portal">
        {children}
        <style jsx>
          {`
            .modal-portal {
              position: fixed;
              top: 0;
              z-index: ${id}00;
            }
          `}
        </style>
      </div>,
      ref.current)
    : null;
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
};
