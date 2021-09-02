import { Squares } from "./Square";
import { DayOfTheWeek } from "./DayOfTheWeek";
import styled from "@emotion/styled";
import { Select, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

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

  const currentYear = new Date().getFullYear();

  const yearOptions = () => {
    const years = [
      { key: "current", value: currentYear },
      { key: "nextYear", value: currentYear + 1 },
    ];
    return years.map((year) => ({
      key: year.key,
      value: year.value,
      text: `${year.value}年`,
    }));
  };

  const monthOptions = () => {
    const months = [
      { key: "jan", value: 1 },
      { key: "feb", value: 2 },
      { key: "mar", value: 3 },
      { key: "apr", value: 4 },
      { key: "may", value: 5 },
      { key: "jun", value: 6 },
      { key: "jul", value: 7 },
      { key: "aug", value: 8 },
      { key: "sep", value: 9 },
      { key: "oct", value: 10 },
      { key: "nov", value: 11 },
      { key: "dec", value: 12 },
    ];

    return months.map((month) => ({
      key: month.key,
      value: month.value,
      text: `${month.value}月`,
    }));
  };

  return (
    <>
      <MonthInfoWrapper>
        <Number>9</Number>
        <Year>Sep 2021</Year>
      </MonthInfoWrapper>
      <DayOfTheWeek />
      <SquaresWrapper>
        <Squares />
      </SquaresWrapper>
      <Select
        placeholder="Select year"
        options={yearOptions()}
        defaultValue={currentYear}
      />
      <Select
        placeholder="Select month"
        options={monthOptions()}
        defaultValue={new Date().getMonth()}
      />
      <Button
        color="yellow"
        labelPosition="right"
        icon="right chevron"
        content="CREATE"
      />
    </>
  );
};
