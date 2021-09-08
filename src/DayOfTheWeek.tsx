import styled from "@emotion/styled";

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
    top: 40px;
    left: 102px;
    position: relative;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    letter-spacing: 0em;
    text-align: left;
    color: #595757;
  `;

  const renderDayOfTheWeek = () => {
    const dayOfTheWeek = [
      { key: "mon", value: "MON" },
      { key: "tue", value: "TUE" },
      { key: "wed", value: "WED" },
      { key: "thu", value: "THU" },
      { key: "fri", value: "FRI" },
      { key: "sat", value: "SAT" },
      { key: "sun", value: "SUN" },
    ];
    return dayOfTheWeek.map((month) => (
      <Wrapper key={month.key}>
        <Day key={month.key}>{month.value}</Day>
      </Wrapper>
    ));
  };

  return (
    <>
      <Row>{renderDayOfTheWeek()}</Row>
    </>
  );
};
