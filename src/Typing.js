import React, { useState, useEffect, useContext, Fragment } from 'react';
import { TimerContext } from './context/TimerContext';
import axios from 'axios';

const Typing = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [wordsLength, setWordsLength] = useState(1);
  const [splitWords, setSplitWords] = useState([]);
  const [color, setColor] = useState('');
  const [disable, setDisable] = useState('');

  const {
    timeStop,
    countUpStartFunction,
    calculateWpm,
    sentence: getSentence,
    loading,
    setLoading,
    getText,
    start,
    end,
    countUpStart,
    endTyping,
  } = useContext(TimerContext);

  const randomText = async () => {
    const randomSentence = await axios.get('https://type.fit/api/quotes');

    const { data } = randomSentence;
    const randomNumber = Math.floor(Math.random() * 100);
    const randomQuote = data[randomNumber].text;
    const wordsArray = randomQuote.split(' ');
    const wordsLength = wordsArray.length;
    setWordsLength(wordsLength);
    setSplitWords(wordsArray);
    getText(randomQuote);
  };

  // eslint-disable-next-line
  const formSubmit = (e) => {
    e.preventDefault();
    if (text === splitWords[count]) {
      setColor('');
      setText('');
      e.target.value = '';
      setCount(count + 1);
    } else {
      console.log('not correct');
      setColor('color');
    }
  };

  useEffect(() => {
    if (loading) {
      randomText();
    }
    if (!countUpStart) {
      setDisable('disabled');
    }
    if (countUpStart) {
      setDisable('');
    }

    const listener = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        formSubmit(e);
      }
    };

    if (wordsLength === count && timeStop === false) {
      countUpStartFunction();
      endTyping();
      calculateWpm(wordsLength);
    }

    setLoading();
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };

    // eslint-disable-next-line
  }, [timeStop, loading, text, wordsLength, count, start, end, countUpStart]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <div className="sentence">
            {getSentence}
            {timeStop ? (
              <Fragment></Fragment>
            ) : (
              <div className="target-word">
                <span>target:</span>
                <span>{splitWords[count]} </span>
              </div>
            )}
            <form action="" onSubmit={formSubmit}>
              <input
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                disabled={`${disable}`}
                className={`type-input + ${color}`}
              />
            </form>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Typing;
