import { useState, useEffect } from "react";
import { Squares } from "./Square";
import { DayOfTheWeek } from "./DayOfTheWeek";
import styled from "@emotion/styled";
import { Dropdown, Menu } from "semantic-ui-react";
import printJS from "print-js";
import "semantic-ui-css/semantic.min.css";
import { ReactComponent as WaveImg } from "./assets/images/wave.svg";
import { renderToStaticMarkup } from "react-dom/server";
import PrintOutButton from "./assets/images/print.png";

export const Calendar = () => {
  const Title = styled("div")`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 0.05em;
    background-color: transparent;
    margin-top: 74px;
    margin-left: 69px;
  `;

  const SubTitle = styled("div")`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #595757;
    margin-left: 66px;
  `;

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
    /* font-family: Roboto; */
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
      "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
    font-style: normal;
    font-weight: normal;
    font-size: 62px;
    line-height: 73px;
    color: #727171;
  `;

  const Year = styled("div")`
    /* font-family: Roboto; */
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
      "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 73px;
    text-align: right;
    color: #727171;
  `;

  const Left = styled("div")`
    margin: 10px;
  `;

  const Right = styled("div")`
    border: 1px solid #b5b5b6;
    margin: 10px;
    background-color: white;
  `;

  const Content = styled("div")`
    display: flex;
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

  const chunkedDates = (arr: any) => {
    const res = [];
    const chunkSize = 7;
    for (let i = 0; i < arr.length; i += chunkSize) {
      let chunk = arr.slice(i, i + chunkSize);
      if (chunk.length < chunkSize) {
        while (chunk.length < 7) {
          chunk.push(null);
        }
      }
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

  const printCalendar = () => {
    printJS("capture", "html");
  };

  const encodedSvgUrl = encodeURIComponent(renderToStaticMarkup(<WaveImg />));

  const backgroundImageStyle = {
    backgroundImage: `url("data:image/svg+xml,${encodedSvgUrl}")`,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: 0,
  };

  const buttonStyle = {
    width: "140.73px",
    height: "33.43px",
  };

  useEffect(() => {
    calcDate(currentYear, currenMonth);
    // TODO: あとでできれば修正
    // eslint-disable-next-line
  }, []);

  return (
    <div style={backgroundImageStyle}>
      <Title>Create your calender.</Title>
      <Title>FREE</Title>
      <Content>
        <Left>
          <SubTitle>Choice your date.</SubTitle>
          <Menu compact>
            <Dropdown
              options={yearOptions()}
              value={selectedYear}
              onChange={changeYear}
              simple
              item
            />
          </Menu>
          <Menu compact>
            <Dropdown
              options={monthOptions()}
              value={selectedMonth}
              onChange={changeMonth}
              simple
              item
            />
          </Menu>
          <img
            src={PrintOutButton}
            style={buttonStyle}
            onClick={printCalendar}
            alt="printoutbutton"
          />
        </Left>
        <Right id="capture">
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
        </Right>
      </Content>
    </div>
  );
};
