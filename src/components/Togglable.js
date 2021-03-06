import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn" onClick={toggleVisibility}>
          Peruuta
        </button>
      </div>
      <div style={hideWhenVisible}>
        <button className="btn" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
    </div>
  );
});

export default Togglable;
