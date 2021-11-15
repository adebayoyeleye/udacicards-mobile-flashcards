import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from './actions'

export default function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.id]:{...action.deck}
      }
    case ADD_CARD :
      return {
        ...state,
        [action.id]:{
          ...state[action.id],
          cards: state[action.id].cards.concat(action.card)
          }
      }
    default :
      return state
  }
}