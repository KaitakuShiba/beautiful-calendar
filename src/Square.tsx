import { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  chunkedDates: any;
}

export const Squares: FC<Props> = (chunkedDates) => {
  const Box = styled("div")`
    border-right: 1px solid #898989;
    border-bottom: 1px solid #898989;
    width: 60px;
    height: 60px;
  `;

  const Row = styled("div")`
    display: flex;
    flex-direction: row;
  `;

  const Date = styled("div")`
    top: 40px;
    left: 40px;
    position: relative;
  `;

  const datesArray = () => {
    if (!chunkedDates["chunkedDates"]["chunked"]) {
      return [[]];
    }

    return chunkedDates["chunkedDates"]["chunked"];
  };

  const renderRows = () => {
    return (
      <>
        {datesArray().map((dates: any, i: number) => (
          <Row key={i}>{renderSquares(dates)}</Row>
        ))}
      </>
    );
  };

  const renderSquares = (dates: any) => {
    return (
      <>
        {dates.map((date: number, i: number) => (
          <Box key={i}>
            <Date key={i}>{ date }</Date>
          </Box>
        ))}
      </>
    );
  };

  return <>{renderRows()}</>;
};
