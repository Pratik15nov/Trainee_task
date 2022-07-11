import React from "react";

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
  Step 1
    </>
  );
};

export default Step1;
