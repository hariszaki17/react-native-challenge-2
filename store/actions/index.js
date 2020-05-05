import axios from 'axios'

export const SET_BOARD = 'SET_BOARD'
export const SET_BOARD_BASE = 'SET_BOARD_BASE'
export const SET_CURRENT_TILE = 'SET_CURRENT_TILE'
export const SET_STATUS = 'SET_STATUS'
export const SET_NAME = 'SET_NAME'
export const SET_INDEX_BOARD = 'SET_INDEX_BOARD'
export const SET_DIFFICULTY = 'SET_DIFFICULTY  '
export const SET_BOARD_LOADNG = 'SET_BOARD_LOADNG  '

export const setBoardBase = (data) => {
    return { type: SET_BOARD_BASE, payload: data }
}
export const setBoardLoading = (data) => {
    return { type: SET_BOARD_LOADNG, payload: data }
}
export const setDifficulty= (data) => {
    return { type: SET_DIFFICULTY, payload: data }
}
export const setIndexBoard = (data) => {
    return { type: SET_INDEX_BOARD, payload: data }
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
export const setName = (data) => {
    return { type: SET_NAME, payload: data }
}

export const fetchBoard = (diificulty) => {
        return ((dispatch) => {
            dispatch(setBoardLoading(true))
            axios({
                method: 'GET',
                url: `https://sugoku.herokuapp.com/board?difficulty=${diificulty}`
            })
            .then((result) => {
                console.log('haiii <<<<<<<<<<<<<<<<<<<')
                let temp = []
                let indexBoard = []
                for (let i = 0; i < result.data.board.length; i++) {
                    temp[i] = []
                    for (let j = 0; j < result.data.board[i].length; j++) { 
                        if (result.data.board[i][j] != 0) {
                            indexBoard.push(`${i},${j}`)
                        }
                        temp[i][j] = result.data.board[i][j]
                    }
                }
                const data = result.data.board
                dispatch(setIndexBoard(indexBoard))
                dispatch(setBoardBase({ board: temp }))
                dispatch(setBoard(result.data.board))
                dispatch(setStatus('-'))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                dispatch(setBoardLoading(false))
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

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export const answerBoard = (payload) => {
    return ((dispatch) => {
        axios({
            method: 'POST',
            data: encodeParams(payload),
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