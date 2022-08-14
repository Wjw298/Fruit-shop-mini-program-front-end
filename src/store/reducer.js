import { combineReducers } from 'redux';

const defaultState = {
  num: 0
}

const counter = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        num: state.num + 1
      }
    case 'MINUS':
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}

export default combineReducers({ counter });
