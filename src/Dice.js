import Dot from "./Dot";

const Dice = ({ value, isHold, changeHold }) => {
  const style = {
    background: isHold ? "#05a595" : "white",
  };
  let dotsArr = [];
  for (let i = 1; i <= value; i++) {
    dotsArr.push(<Dot isHold={isHold} gridAr={`num${i}`} key={i} />);
  }
  let dotsStyle = {
    gridTemplateAreas: "",
  };
  // eslint-disable-next-line default-case
  switch (value) {
    case 1:
      dotsStyle.gridTemplateAreas = '". . ." ". num1 ." ". . ."';
      break;
    case 2:
      dotsStyle.gridTemplateAreas = '". . num1" ". . ." "num2 . ."';
      break;
    case 3:
      dotsStyle.gridTemplateAreas = '". . num1" ". num2 ." "num3 . ."';
      break;
    case 4:
      dotsStyle.gridTemplateAreas = '"num1 . num2" ". . ." "num3 . num4"';
      break;
    case 5:
      dotsStyle.gridTemplateAreas = '"num1 . num2" ". num3 ." "num4 . num5"';
      break;
    case 6:
      dotsStyle.gridTemplateAreas = '"num1 . num2" "num3 . num4" "num5 . num6"';
      break;
  }
  return (
    <div className="tenzies__die" style={style} onClick={changeHold}>
      <div className="dots__box" style={dotsStyle}>
        {dotsArr}
      </div>
    </div>
  );
};
export default Dice;
