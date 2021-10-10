import { useState, useEffect } from "react";
import { Rows } from "./Rows";
import { DayOfTheWeek } from "./DayOfTheWeek";
import styled from "@emotion/styled";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PrintOutButton from "./assets/images/print.png";
import WaveImg from "./assets/images/wave.png";
import { Constant } from "./Constant";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, Select, MenuItem } from "@mui/material";

export const Calendar = () => {
  const ButtonsWrapper = styled("span")`
    display: flex;
    margin-bottom: 33px;
  `;

  const SelectYearWrapper = styled("span")`
    margin-right: 20px;
    display: flex;
    flex-flow: column;
  `;

  const SelectMonthWrapper = styled("span")`
    margin-right: 20px;
    display: flex;
    flex-flow: column;
  `;

  const PrintOutButtonWrapper = styled("div")`
    cursor: pointer;
  `;

  const Title = styled("div")`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 0.05em;
    background-color: transparent;
    margin-left: 69px;
    color: #ffffff;
  `;

  const SubTitle = styled("div")`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: #595757;
    margin-bottom: 23px;
  `;

  const RowsWrapper = styled("div")`
    margin: 0 36px 20px 36px;
    border-left: 1px solid #898989;
    border-top: 1px solid #898989;
    width: 718px;
  `;

  const MonthInfoWrapper = styled("div")`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 35px;
    width: 718px;
  `;

  const Month = styled("div")`
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
    padding-top: 320px;
    margin-left: 66px;
  `;

  const Right = styled("div")``;

  const Content = styled("div")`
    display: flex;
  `;

  const CalendarDescription = styled("div")`
    text-align: right;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: 14px;
    letter-spacing: 0.03em;
    color: #ffffff;
    margin-right: 10px;
  `;

  const currentYear = new Date().getFullYear();
  // 海外では0-11として解釈されるため
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [squareWrapperHeight, setSquareWrapperHeight] = useState(0);
  const [dates, setDates] = useState({});
  const years = [
    { key: currentYear, value: currentYear },
    { key: currentYear + 1, value: currentYear + 1 },
  ];

  const changeYear = (e: any, data: any) => {
    const year = data.props.value;
    setSelectedYear(year);
    calcDate(year, selectedMonth);
  };

  const changeMonth = (e: any, data: any) => {
    const month = data.props.value;
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
    const source = document.getElementById("capture") as HTMLElement;
    html2canvas(source).then((capture) => {
      const imgData = capture.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "landscape",
      });
      const width = doc.internal.pageSize.width;
      const height = doc.internal.pageSize.height;
      doc.addImage(imgData, "PNG", 0, 0, width, height);
      doc.save(`calendar_${currentYear}_${currentMonth}.pdf`);
    });
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${WaveImg})`,
    backgroundRepeat: "repeat-x",
    height: "440px",
  };

  const buttonStyle = {
    width: "200px",
    height: "79px",
  };

  useEffect(() => {
    calcDate(currentYear, currentMonth);
    // TODO: あとでできれば修正
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSquareWrapperHeight(
      document.getElementById("squares-wrapper")!.offsetHeight
    );
  }, []);

  const CalendarContent = styled("div")`
    border: 1px solid #b5b5b6;
    margin: 10px;
    background-color: white;
    width: 841px;
    height: calc(${squareWrapperHeight} + 200px);
  `;

  const renderYearSelects = () => {
    return years.map((year) => (
      <MenuItem value={year.value}>{year.value}</MenuItem>
    ));
  };

  const renderMonthSelects = () => {
    let elements: object[] = [];
    Constant.months.forEach((value: string, key: number) => {
      elements.push(<MenuItem value={key}>{value}</MenuItem>);
    });
    return elements;
  };

  return (
    <div style={backgroundImageStyle}>
      <Title style={{ paddingTop: "74px" }}>Create your calendar.</Title>
      <Title style={{ paddingTop: "24px" }}>FREE</Title>
      <Content>
        <Left>
          <SubTitle>Select the date.</SubTitle>
          <ButtonsWrapper>
            <SelectYearWrapper>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Year
                </InputLabel>
                <Select defaultValue={selectedYear} onChange={changeYear}>
                  {renderYearSelects()}
                </Select>
              </FormControl>
            </SelectYearWrapper>
            <SelectMonthWrapper>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Month
                </InputLabel>
                <Select
                  defaultValue={selectedMonth}
                  onChange={changeMonth}
                >
                  {renderMonthSelects()}
                </Select>
              </FormControl>
            </SelectMonthWrapper>
          </ButtonsWrapper>
          <PrintOutButtonWrapper>
            <img
              src={PrintOutButton}
              style={buttonStyle}
              onClick={printCalendar}
              alt="printoutbutton"
            />
          </PrintOutButtonWrapper>
        </Left>
        <Right>
          <CalendarDescription>Save this preview.</CalendarDescription>
          <CalendarContent id="capture">
            <MonthInfoWrapper>
              <Month id="month">{selectedMonth}</Month>
              <Year>
                {Constant.months.get(selectedMonth)} {selectedYear}
              </Year>
            </MonthInfoWrapper>
            <DayOfTheWeek />
            <RowsWrapper id="squares-wrapper">
              <Rows chunkedDates={dates} />
            </RowsWrapper>
          </CalendarContent>
        </Right>
      </Content>
    </div>
  );
};
