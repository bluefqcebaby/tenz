const Dot = ({ isHold, gridAr }) => {
  const style = {
    background: isHold ? "white" : "black",
    gridArea: gridAr,
  };
  return <div className="dot" style={style}></div>;
};
export default Dot;
