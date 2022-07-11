import React from "react";

const Step2 = (props) => {
  if (props.currentStep !== 2) {
    return null;
  }

  return <>
    Step 2
  </>;
};

export default Step2;
