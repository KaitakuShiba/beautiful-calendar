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
  const currenMonth = new Date().getMonth();

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

  const months = [
    { key: "Jan", value: 1 },
    { key: "Feb", value: 2 },
    { key: "Mar", value: 3 },
    { key: "Apr", value: 4 },
    { key: "May", value: 5 },
    { key: "Jun", value: 6 },
    { key: "Jul", value: 7 },
    { key: "Aug", value: 8 },
    { key: "Sep", value: 9 },
    { key: "Oct", value: 10 },
    { key: "Nov", value: 11 },
    { key: "Dec", value: 12 },
  ];

  const monthOptions = () => {
    return months.map((month) => ({
      key: month.key,
      value: month.value,
      text: `${month.value}月`,
    }));
  };

  const findCurrentMonthKey = (
    objs: Array<{ key: String; value: Number }>,
    value: Number
  ) => {
    return objs.find((obj) => obj.value === value)?.key;
  };

  return (
    <>
      <MonthInfoWrapper>
        <Number>{currenMonth}</Number>
        <Year>
          {findCurrentMonthKey(months, currenMonth)} {currentYear}
        </Year>
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
