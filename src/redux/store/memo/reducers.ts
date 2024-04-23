import * as actions from './actions';
const initialState = {
  memoList: [],
  memoCategoryList: [],
};
export const memoReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'MEMO_LIST':
      return { ...state, memoList: action.payload };
    case 'SET_MEMO_CATEGORY_LIST':
      return {
        ...state,
        memoCategoryList: [...state.memoCategoryList, action.payload],
      };
    default:
      return state;
  }
};
