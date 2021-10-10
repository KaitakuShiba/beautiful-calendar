import { FC } from "react";
import { Squares } from "./Squares";
import styled from "@emotion/styled";

interface Props {
  chunkedDates: any;
}

export const Rows: FC<Props> = (chunkedDates) => {
  const Row = styled("div")`
    display: flex;
    flex-direction: row;
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
          <Row key={i}>{Squares(dates)}</Row>
        ))}
      </>
    );
  };

  return <>{renderRows()}</>;
};
