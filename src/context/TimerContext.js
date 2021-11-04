import React, { createContext, useReducer } from 'react';
import TimerReducer from './TimerReducer';

const initialState = {
  timeStop: false,
  words: 0,
  sentence: [],
  wordsArray: [],
  wordsLength: 0,
  splitWords: [],
  loading: true,
};

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);

  function calculateWpm(words) {
    dispatch({
      type: 'CALCULATE_WPM',
      payload: words,
    });
  }
  function getText(data) {
    dispatch({
      type: 'GET_TEXT',
      payload: data,
    });
  }
  function setLoading() {
    dispatch({
      type: 'SET_LOADING',
    });
  }
  function getWordsLength(data) {
    dispatch({
      type: 'WORDS_LENGTH',
      payload: data,
    });
  }
  function getWordsArray(data) {
    dispatch({
      type: 'WORDS_ARRAY',
      payload: data,
    });
  }

  return (
    <TimerContext.Provider
      value={{
        timeStop: state.timeStop,
        words: state.words,
        loading: state.loading,
        sentence: state.sentence,
        wordsLength: state.wordsLength,
        wordsArray: state.wordsArray,
        calculateWpm,
        getText,
        setLoading,
        getWordsLength,
        getWordsArray,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
