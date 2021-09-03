import { useState } from "react";
import { Squares } from "./Square";
import { DayOfTheWeek } from "./DayOfTheWeek";
import styled from "@emotion/styled";
import { Select } from "semantic-ui-react";
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

  const Month = styled("div")`
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

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currenMonth);

  const yearOptions = () => {
    const years = [
      { key: "current", value: currentYear },
      { key: "nextYear", value: currentYear + 1 },
    ];
    return years.map((year) => ({
      key: year.key,
      value: year.value,
      text: year.value,
    }));
  };

  const months = [
    { key: "January", value: 1 },
    { key: "February", value: 2 },
    { key: "March", value: 3 },
    { key: "April", value: 4 },
    { key: "May", value: 5 },
    { key: "June", value: 6 },
    { key: "July", value: 7 },
    { key: "August", value: 8 },
    { key: "September", value: 9 },
    { key: "October", value: 10 },
    { key: "November", value: 11 },
    { key: "December", value: 12 },
  ];

  const monthOptions = () => {
    return months.map((month) => ({
      key: month.key,
      value: month.value,
      text: month.key,
    }));
  };

  const findCurrentMonthKey = (
    objs: Array<{ key: string; value: number }>,
    value: number
  ) => {
    return objs.find((obj) => obj.value === value)?.key;
  };

  const changeYear = (e: any, data: any) => {
    setSelectedYear(data.value);
  };

  const changeMonth = (e: any, data: any) => {
    setSelectedMonth(data.value);
  };

  return (
    <>
      <MonthInfoWrapper>
        <Month>{selectedMonth}</Month>
        <Year>
          {findCurrentMonthKey(months, selectedMonth)} {selectedYear}
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
        onChange={changeYear}
      />
      <Select
        placeholder="Select month"
        options={monthOptions()}
        defaultValue={new Date().getMonth()}
        onChange={changeMonth}
      />
    </>
  );
};
