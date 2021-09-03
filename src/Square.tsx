import { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  dates: object;
}

export const Squares: FC<Props> = (dates) => {
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
    left: 45px;
    position: relative;
  `;

  const renderRowSquares = (dates: any) => {
    const datesArray = dates["dates"]["firstWeekDays"];
    if (datesArray === undefined) {
      return <></>;
    }
    return datesArray.map((date: number, i: number) => (
      <Box key={i}>
        <Date key={i}>{date}</Date>
      </Box>
    ));
  };

  return (
    <>
      <Row>{renderRowSquares(dates)}</Row>
    </>
  );
};
