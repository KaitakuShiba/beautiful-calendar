import styled from "@emotion/styled";

export const Square = () => {
  const Box = styled("div")`
    border-right: 1px solid #898989;
    border-bottom: 1px solid #898989;
    width: 60px;
    height: 60px;
  `;

  const Row = styled("div")`
    display: flex;
    flex-direction: row;
  `;

  const Date = styled("div")`
    top: 40px;
    left: 45px;
    position: relative;
  `;

  const renderRowSquares = () => {
    return [1, 2, 3, 4, 5, 6, 7].map((i) => (
      <Box>
        <Date>{i}</Date>
      </Box>
    ));
  };

  return (
    <>
      <Row>{renderRowSquares()}</Row>
      <Row>{renderRowSquares()}</Row>
      <Row>{renderRowSquares()}</Row>
      <Row>{renderRowSquares()}</Row>
      <Row>{renderRowSquares()}</Row>
    </>
  );
};
