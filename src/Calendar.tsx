import { Square } from "./Square";
import { Days } from "./Days";
import styled from "@emotion/styled";

export const Calendar = () => {
  const Wrapper = styled("div")`
    margin: 0 20px 20px 20px;
    border-left: 1px solid #898989;
    border-top: 1px solid #898989;
    width: 420px;
  `;

  return (
    <>
      <Days />
      <Wrapper>
        <Square />
      </Wrapper>
    </>
  );
};
