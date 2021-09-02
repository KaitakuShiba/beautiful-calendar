import styled from "@emotion/styled";

export const Days = () => {
  const Wrapper = styled("div")`
    width: 60px;
    height: 60px;
  `;

  const Row = styled("div")`
    display: flex;
    flex-direction: row;
  `;

  const Day = styled("div")`
    top: 40px;
    left: 45px;
    position: relative;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    letter-spacing: 0em;
    text-align: left;
    color: #595757;
  `;

  const renderDays = () => {
    return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((i) => (
      <Wrapper>
        <Day>{i}</Day>
      </Wrapper>
    ));
  };

  return (
    <>
      <Row>{renderDays()}</Row>
    </>
  );
};
