import { useState, useEffect } from "react";
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
  // 海外では0-11として解釈されるため
  const currenMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currenMonth);
  const [dates, setDates] = useState({});

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
    const year = data.value;
    setSelectedYear(year);
    calcDate(year, selectedMonth);
  };

  const changeMonth = (e: any, data: any) => {
    const month = data.value;
    setSelectedMonth(month);
    calcDate(selectedYear, month);
  };

  const calcFirstWeekDays = (dayOfTheWeekEnum: number) => {
    // Sunday - Saturday : 0 - 6
    // if Starting Sunday(0): [0, 0, 0, 0, 0, 0, 1]
    // if Starting Wednesday(3): [0, 0, 1, 2, 3, 4, 5]
    if (dayOfTheWeekEnum === 0) {
      return [null, null, null, null, null, null, 1];
    } else {
      // 月曜日始まりに合わせるため
      const mondayStartEnum = dayOfTheWeekEnum - 1;
      const disableDays = Array(mondayStartEnum).fill(null);
      const enableDays = [...Array(7 - mondayStartEnum)].map((_, i) => i + 1);
      return disableDays.concat(enableDays);
    }
  };

  const createSecondWeekDates = (
    firstDayOnSecondWeek: number,
    daysCountInThisMonth: number
  ) => {
    return Array.from(
      { length: daysCountInThisMonth - firstDayOnSecondWeek + 1 },
      (_, i) => firstDayOnSecondWeek + i
    );
  };

  const chunkedDates = (arr: number[]) => {
    const res = [];
    const chunkSize = 7;
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const calcDate = (year: number, month: number) => {
    // 日本での表示のために月がずれているので正確な値を出すために戻す
    const firstWeekDays = calcFirstWeekDays(new Date(year, month - 1).getDay());
    const firstDayOnSecondWeek = firstWeekDays[firstWeekDays.length - 1] + 1;
    const daysCountInThisMonth = new Date(year, month, 0).getDate();
    const totalDays = firstWeekDays.concat(
      createSecondWeekDates(firstDayOnSecondWeek, daysCountInThisMonth)
    );

    const chunked = chunkedDates(totalDays);
    setDates({ ...dates, chunked });
  };

  useEffect(() => {
    calcDate(currentYear, currenMonth);
    // TODO: あとでできれば修正
    // eslint-disable-next-line
  }, []);

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
        <Squares chunkedDates={dates} />
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
        defaultValue={currenMonth}
        onChange={changeMonth}
      />
    </>
  );
};
