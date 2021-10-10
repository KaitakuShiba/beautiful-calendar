import { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  chunkedDates: any;
}

export const Squares: FC<Props> = (chunkedDates) => {
  const Box = styled("div")`
    border-right: 1px solid #898989;
    border-bottom: 1px solid #898989;
    width: 102.5px;
    height: 102.5px;
  `;

  const Date = styled("div")`
    top: 80px;
    left: 80px;
    position: relative;
  `;

  const renderSquares = (dates: any) => {
    return (
      <>
        {dates.map((date: number, i: number) => (
          <Box key={i}>
            <Date key={i}>{date}</Date>
          </Box>
        ))}
      </>
    );
  };

  return <>{renderSquares(chunkedDates)}</>;
};
