import React from "react";
import styled from "@emotion/styled";

export const Square = () => {
  const Hello = styled("div")`
    color: red;
  `;

  return (
    <React.Fragment>
      <Hello>Square</Hello>
    </React.Fragment>
  );
};
