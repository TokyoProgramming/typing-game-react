import React, { useState, useEffect, useContext, Fragment } from 'react';
import { TimerContext } from './context/TimerContext';

const Timer = () => {
  const {
    timeStop,
    words,
    start,
    end,
    startTyping,
    countUpStartFunction,
    countUpStart,
  } = useContext(TimerContext);

  const [countDown, setCountDown] = useState(5);
  const [countUp, setCountUp] = useState(0);
  const [wpm, setWpm] = useState(0);

  const wpmCalculator = (words, time) => {
    const wpmScore = ((words / time) * 60).toFixed();
    setWpm(wpmScore);
  };
  const startTypingGame = () => {
    startTyping();
  };

  useEffect(() => {
    let countDownTimer = countDown;
    if (start === true && end === false) {
      countDownTimer =
        countDown > 0 && setInterval(() => setCountDown(countDown - 1), 1000);
    }
    let countUpTimer = countUp;
    if (countDown === 0 && timeStop === false) {
      if (!countUpStart) {
        countUpStartFunction();
      }
      countUpTimer = setInterval(() => setCountUp(countUp + 1), 1000);
    }
    if (timeStop === true) {
      wpmCalculator(words, countUp);
    }
    return () => {
      clearInterval(countDownTimer);
      clearInterval(countUpTimer);
    };
  }, [countDown, countUp, timeStop, words, start, end]);

  return (
    <div className="count">
      {!start && !end ? (
        <button
          onClick={() => {
            startTypingGame();
          }}
        >
          start Typing Game
        </button>
      ) : (
        <Fragment>
          {timeStop === true && end ? (
            <Fragment>
              <span>your Wpm : </span>
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
                  <span>countDown : </span>
                  <span>{countDown} </span>
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Timer;
