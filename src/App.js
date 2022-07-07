import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { GiDiamondTrophy } from "react-icons/gi";
const App = () => {
  const [dices, setDices] = useState(allNewDice());
  const [win, setWin] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [btnText, setBtnText] = useState("Начать");
  const [timerTime, setTimerTime] = useState(0);
  const [tapRecord, setTapRecord] = useState(
    localStorage.getItem("tap-rec") ? localStorage.getItem("tap-rec") : 99
  );
  const [timeRecord, setTimeRecord] = useState(
    localStorage.getItem("time-rec") ? localStorage.getItem("time-rec") : 99
  );
  const infoRef = React.createRef();
  const statsRef = React.createRef();
  useEffect(() => {
    let interval = null;
    if (btnText === "Бросить кубики 🎲") {
      interval = setInterval(() => {
        setTimerTime((prev) => prev + 0.1);
      }, 100);
    }
    return () => {
      console.log("cleared");
      clearInterval(interval);
    };
  }, [btnText]);

  useEffect(() => {
    const num = dices[0].value;
    // Делаем новый массив по условию: кнопка нажата, все значения между собой равны
    const checkArr = dices.filter((item) => item.isHold && item.value === num);
    if (checkArr.length === dices.length) {
      setWin(true);
      setTapCount((prev) => prev - 1); // фикс бага что при нажатии "начать" счетчик уже имеет значение 1
      setBtnText("Новая игра");
      if (tapCount < tapRecord) {
        const taps = tapCount;
        localStorage.setItem("tap-rec", taps - 1);
        setTapRecord(taps - 1);
      }
      if (timerTime < timeRecord) {
        localStorage.setItem("time-rec", timerTime.toFixed(1));
        setTimeRecord(timerTime.toFixed(1));
      }
    }
  }, [dices]);

  function allNewDice() {
    let newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(createDice());
    }
    return newArr;
  }

  function createDice() {
    return {
      id: nanoid(10),
      value: Math.ceil(Math.random() * 6),
      isHold: false,
    };
  }

  function rollDices() {
    if (win) {
      setDices(allNewDice());
      setWin(false);
      setTapCount(0);
      setBtnText("Начать");
      setTimerTime(0);
    } else {
      setTapCount((prev) => prev + 1);
      if (tapCount === 0) {
        setBtnText("Бросить кубики 🎲");
      } else {
        setDices((prev) =>
          prev.map((item) => (item.isHold ? item : createDice()))
        );
      }
    }
  }

  async function changeHold(id) {
    if (tapCount === 0) {
      const popupInfo = infoRef.current;
      popupInfo.classList.add("active");
      setTimeout(() => {
        popupInfo.classList.remove("active");
      }, 1400);
    } else {
      setDices((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isHold: !item.isHold,
              }
            : item
        )
      );
    }
  }
  function handleStats() {
    const item = statsRef.current;
    item.classList.toggle("active");
  }
  return (
    <>
      {win && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="popup__info" ref={infoRef}>
        Нажмите на кнопку, чтобы начать играть.
      </div>
      <main className="tenzies">
        <div className="tenzies__stats" ref={statsRef}>
          <p className="best__text">
            Лучшее время: {timeRecord === 99 ? "null" : timeRecord} секунд(ы)
          </p>
          <p className="best__text">
            Лучший результат: {tapRecord === 99 ? "null" : tapRecord}
          </p>
          <GiDiamondTrophy className="icon" onClick={handleStats} />
          <div className="blur"></div>
        </div>
        <h1 className="tenzies__title">{win ? "🎊 Победа 🎊" : "Tenzies"}</h1>
        <p className="tenzies__text">
          {win
            ? `Вы можете посмотреть ваш лучший результат нажав на иконку кубка,
          чтобы начать новую игру нажмите кнопку`
            : `Нажимайте на кнопку, пока все кубики не станут одинаковыми. Нажмите на
          каждый кубик, чтобы заморозить его текущее значение между бросками.`}
        </p>
        <div className="tenzies__box">
          {dices.map((item) => (
            <Dice
              value={item.value}
              key={item.id}
              isHold={item.isHold}
              changeHold={() => changeHold(item.id)}
            />
          ))}
        </div>
        <div className="tenzies__info">
          <h3 className="tenzies__info-text">
            Время: <span className="time">{timerTime.toFixed(1)}</span>
          </h3>
          {win && (
            <h3 className="tenzies__info-text">
              Результат: <span className="time">{tapCount}</span>
            </h3>
          )}
        </div>
        <button className="tenzies__btn" onClick={rollDices}>
          {btnText}
        </button>
      </main>
    </>
  );
};

export default App;
