import styled from "@emotion/styled";
import { Constant } from "./Constant";

export const DayOfTheWeek = () => {
  const Wrapper = styled("div")`
    width: 102.5px;
    height: 56.5px;
  `;

  const Row = styled("div")`
    display: flex;
    flex-direction: row;
  `;

  const Day = styled("div")`
    top: 38px;
    left: 100px;
    position: relative;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    letter-spacing: 0em;
    text-align: left;
    color: #595757;
  `;

  const renderDayOfTheWeek = () => {
    let elements: object[] = [];
    Constant.dayOfTheWeek.forEach((value: string, key: string) => {
      elements.push(
        <Wrapper key={key}>
          <Day key={key}>{value}</Day>
        </Wrapper>
      );
    });
    return elements;
  };

  return (
    <>
      <Row>{renderDayOfTheWeek()}</Row>
    </>
  );
};
