const TimerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CALCULATE_WPM':
      return {
        ...state,
        timeStop: true,
        words: payload,
      };

    case 'GET_TEXT_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_TEXT':
      return {
        ...state,

        sentence: payload,
      };
    case 'WORDS_LENGTH':
      return {
        ...state,

        wordsLength: payload,
      };
    case 'WORDS_ARRAY':
      return {
        ...state,

        wordsArray: payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: false,
      };

    case 'START_TYPING':
      return {
        ...state,
        start: true,
      };
    case 'END_TYPING':
      return {
        ...state,
        start: false,
        countUpStart: false,
        end: true,
      };
    case 'COUNT_UP_START':
      return {
        ...state,
        countUpStart: !state.countUpStart,
      };
    default:
      return state;
  }
};

export default TimerReducer;
