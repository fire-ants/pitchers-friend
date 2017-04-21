import PF from '../data/PF';

function setPlayers(players) {
  return {
    type : 'SET_MODEL_PLAYERS',
    players
  };
};

export function fetchPlayers() {
  return function (dispatch, getState) {
    return PF.getPlayers()
      .then((response) => response.json())
      .then((players) => dispatch(setPlayers(players)))
      .catch((err) => console.log(err));
  }
}
