import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

// use forwardRef to enable Refs
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  // show/hide display style
  const showWhenVisible = {
    display: visible ? "" : "none",
  };

  const hideWhenVisible = {
    display: visible ? "none" : "",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // useImperativeHandle hook to allow other component to use toggleVisibility()
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <Button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} fullWidth>cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
