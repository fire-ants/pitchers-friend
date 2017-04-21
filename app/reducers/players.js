const initialState = {};

export default function players(state = initialState, action) {
  switch (action.type) {
    case 'SET_MODEL_PLAYERS' :
      return {
        ...state,
        players : action.players
      };
    default:
      return state;
  }
};
