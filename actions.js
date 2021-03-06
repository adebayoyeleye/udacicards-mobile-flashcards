import { _getDecks } from './utils/_DATA';


export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'


export function handleInitialData () {
  return (dispatch) => {
    return _getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks))
      })
  }
}


export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}


export function addCard ({ id, card }) {
  return {
    type: ADD_CARD,
    id,
    card
  }
}

