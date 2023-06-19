import React from "react";

const container = {
  width: "100%",
  height: "10px",
  backgroundColor: "#e0e0de",
  borderRadius: "5px",
};

const getProgress = (progress) => {
  return {
    width: `${progress}%`,
    height: "100%",
    backgroundColor: "#2a9d8f",
    borderRadius: "5px",
  };
};

const ProgressBar = (props) => {
  return (
    <div style={container}>
      <div style={getProgress(props.progress)}></div>
    </div>
  );
};

export default ProgressBar;
