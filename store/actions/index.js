import axios from 'axios'

export const SET_BOARD = 'SET_BOARD'
export const SET_BOARD_BASE = 'SET_BOARD_BASE'
export const SET_CURRENT_TILE = 'SET_CURRENT_TILE'
export const SET_STATUS = 'SET_STATUS'

export const setBoardBase = (data) => {
    return { type: SET_BOARD_BASE, payload: data }
}
export const setBoard = (data) => {
    return { type: SET_BOARD, payload: data }
}
export const setCurrentTile = (data) => {
    return { type: SET_CURRENT_TILE, payload: data }
}
export const setStatus = (data) => {
    return { type: SET_STATUS, payload: data }
}

export const fetchBoard = () => {
    return ((dispatch) => {
        axios({
            method: 'GET',
            url: 'https://sugoku.herokuapp.com/board?difficulty=easy'
        })
        .then((result) => {
            dispatch(setBoard(result.data.board))
            dispatch(setBoardBase(result.data.board))
            dispatch(setStatus('-'))
        })
        .catch((err) => {
            console.log(err)
        })
    })
}

export const solveBoard = (payload) => {
    return ((dispatch) => {
        axios({
            method: 'POST',
            data: payload,
            url: 'https://sugoku.herokuapp.com/validate'
        })
        .then((result) => {
            console.log(result.data)
            dispatch(setStatus(result.data.status))
        })
        .catch((err) => {
            console.log(err)
        })
    })
}

export const answerBoard = (payload) => {
    return ((dispatch) => {
        axios({
            method: 'POST',
            data: payload,
            url: 'https://sugoku.herokuapp.com/solve'
        })
        .then((result) => {
            console.log(result.data)
            dispatch(setBoard(result.data.solution))
            dispatch(setStatus(result.data.status))
        })
        .catch((err) => {
            console.log(err)
        })
    })
}