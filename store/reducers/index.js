import { SET_BOARD, SET_CURRENT_TILE, SET_BOARD_BASE, SET_STATUS, SET_NAME, SET_INDEX_BOARD, SET_DIFFICULTY, SET_BOARD_LOADNG } from "../actions";

const initialState = {
    board: [],
    boardBase: [],
    indexBoard: [],
    currentTile: {
        x: 0,
        y: 0
    },
    status: '-',
    name: '',
    difficulty: 'easy',
    fetchBoardLoading: false
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    if ( type === SET_BOARD ) {
        return { ...state, board: payload }
    } else if ( type === SET_CURRENT_TILE ) {
        return { ...state, currentTile: payload }
    } else if ( type === SET_BOARD_BASE ) {
        return { ...state, boardBase: payload }
    } else if ( type === SET_STATUS ) {
        return { ...state, status: payload }
    } else if ( type === SET_NAME ) {
        return { ...state, name: payload }
    } else if ( type === SET_INDEX_BOARD ) {
        return { ...state, indexBoard: payload }
    } else if ( type === SET_DIFFICULTY ) {
        return { ...state, difficulty: payload }
    } else if ( type === SET_BOARD_LOADNG ) {
        return { ...state, fetchBoardLoading: payload }
    }
    return state
}

export default reducer