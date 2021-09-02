import styled from "@emotion/styled";

export const Squares = () => {
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
    const rows = [
      { key: "first", value: 1 },
      { key: "second", value: 2 },
      { key: "third", value: 3 },
      { key: "4th", value: 4 },
      { key: "5th", value: 5 },
      { key: "6th", value: 6 },
      { key: "7th", value: 7 },
    ];
    return rows.map((row) => (
      <Box key={row.key}>
        <Date key={row.key}>{row.value}</Date>
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
