import { Squares } from "./Square";
import { Days } from "./Days";
import styled from "@emotion/styled";

export const Calendar = () => {
  const SquaresWrapper = styled("div")`
    margin: 0 20px 20px 20px;
    border-left: 1px solid #898989;
    border-top: 1px solid #898989;
    width: 420px;
  `;

  const MonthInfoWrapper = styled("div")`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 0 20px;
    width: 420px;
  `;

  const Number = styled("div")`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 62px;
    line-height: 73px;
    color: #727171;
  `;

  const Year = styled("div")`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 73px;
    text-align: right;
    color: #727171;
  `;

  return (
    <>
      <MonthInfoWrapper>
        <Number>9</Number>
        <Year>Sep 2021</Year>
      </MonthInfoWrapper>
      <Days />
      <SquaresWrapper>
        <Squares />
      </SquaresWrapper>
    </>
  );
};
