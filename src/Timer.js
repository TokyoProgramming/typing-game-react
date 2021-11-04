import React, { useState, useEffect, useContext, Fragment } from 'react';
import { TimerContext } from './context/TimerContext';

const Timer = () => {
  const { timeStop, words } = useContext(TimerContext);

  const [countDown, setCountDown] = useState(5);
  const [countUp, setCountUp] = useState(0);
  const [wpm, setWpm] = useState(0);

  const wpmCalculator = (words, time) => {
    const wpmScore = ((words / time) * 60).toFixed();
    setWpm(wpmScore);
  };

  useEffect(() => {
    const countDownTimer =
      countDown > 0 && setInterval(() => setCountDown(countDown - 1), 1000);
    let countUpTimer = countUp;

    if (countDown === 0 && timeStop === false) {
      countUpTimer = setInterval(() => setCountUp(countUp + 1), 1000);
    }

    if (timeStop === true) {
      wpmCalculator(words, countUp);
    }

    return () => {
      clearInterval(countDownTimer);
      clearInterval(countUpTimer);
    };
  }, [countDown, countUp, timeStop]);

  return (
    <div className="count">
      {timeStop === true ? (
        <Fragment>
          <span>your Wpm </span>
          <span>{wpm} </span>
        </Fragment>
      ) : (
        <Fragment>
          {countDown === 0 && timeStop === false ? (
            <div className="count-up">
              <span>countUp : </span>
              <span>{countUp}</span>
            </div>
          ) : (
            <div className="count-down">
              <span>countDown :</span>
              <span>{countDown} </span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Timer;
