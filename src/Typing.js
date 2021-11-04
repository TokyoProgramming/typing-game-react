import React, { useState, useEffect, useContext, Fragment } from 'react';
import { TimerContext } from './context/TimerContext';
import axios from 'axios';

const Typing = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [wordsLength, setWordsLength] = useState(1);

  const [splitWords, setSplitWords] = useState([]);

  const {
    timeStop,
    calculateWpm,
    sentence: getSentence,
    loading,
    setLoading,
    getText,
  } = useContext(TimerContext);

  const randomText = async () => {
    console.log(loading);
    if (loading) {
      const randomSentence = await axios.get('https://type.fit/api/quotes');
      const { data } = randomSentence;
      const randomNumber = Math.floor(Math.random() * 100);
      const randomQuote = data[randomNumber].text;
      const wordsArray = randomQuote.split(' ');
      const wordsLength = wordsArray.length;
      setWordsLength(wordsLength);
      setSplitWords(wordsArray);

      getText(randomQuote);
    }
  };

  // eslint-disable-next-line
  const formSubmit = (e) => {
    e.preventDefault();

    if (text === splitWords[count]) {
      setText('');
      e.target.value = '';
      setCount(count + 1);
    } else {
      console.log('not correct');
    }
  };

  useEffect(() => {
    if (loading) {
      randomText();
    }

    const listener = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        formSubmit(e);
      }
    };

    if (wordsLength === count && timeStop === false) {
      calculateWpm(wordsLength);
    }

    setLoading();
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };

    // eslint-disable-next-line
  }, [timeStop, loading, text, wordsLength, count]);

  return (
    <div>
      {loading ? (
        <Fragment>
          <h1>Loading...</h1>
        </Fragment>
      ) : (
        <Fragment>
          <h1>{getSentence} </h1>
          <div className="total-length">
            <span>length:</span>
            <span>{wordsLength} </span>
          </div>
          <div className="target-word">
            <span>target:</span>
            <span>{splitWords[count]} </span>
          </div>
          <form action="" onSubmit={formSubmit}>
            <input
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
              className=""
            />
          </form>

          <h1>{count} </h1>
        </Fragment>
      )}
    </div>
  );
};

export default Typing;
