import axios from 'axios'

export const SET_BOARD = 'SET_BOARD'
export const SET_BOARD_BASE = 'SET_BOARD_BASE'
export const SET_CURRENT_TILE = 'SET_CURRENT_TILE'
export const SET_STATUS = 'SET_STATUS'
export const SET_NAME = 'SET_NAME'
export const SET_INDEX_BOARD = 'SET_INDEX_BOARD'
export const SET_DIFFICULTY = 'SET_DIFFICULTY'
export const SET_BOARD_LOADNG = 'SET_BOARD_LOADNG'
export const SET_FIRST_TOUCH = 'SET_FIRST_TOUCH'
export const SET_COUNT1 = 'SET_COUNT1'
export const SET_COUNT2 = 'SET_COUNT2'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const SET_ANSWERED = 'SET_ANSWERED'
export const SET_LEADERBOARD = 'SET_LEADERBOARD'

export const setLeaderBoard = (data) => {
    return { type: SET_LEADERBOARD, payload: data }
}
export const setAnswered = (data) => {
    return { type: SET_ANSWERED, payload: data }
}
export const setNotification = (data) => {
    return { type: SET_NOTIFICATION, payload: data }
}
export const setCount1 = (data) => {
    return { type: SET_COUNT1, payload: data }
}
export const setCount2 = (data) => {
    return { type: SET_COUNT2, payload: data }
}
export const setFirstTouch = (data) => {
    return { type: SET_FIRST_TOUCH, payload: data }
}
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

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

let setInt
export const count = (tag) => {
    clearInterval(setInt)
    return ((dispatch) => {
        if (tag == 'on') {
            let sec = 59
            let min = 4
            setInt = setInterval(() => {
                sec--
                if (sec >= 0) {
                    dispatch(setCount1(sec))
                }
                if (sec < 0) {
                    if (min < 1) {
                        clearInterval(setInt)
                        dispatch(setCount1(59))
                        dispatch(setCount2(4))
                    } else {
                        sec = 59
                        dispatch(setCount1(sec))
                        min--
                        dispatch(setCount2(min))
                    }
                }
            }, 1000);
        } else if (tag == 'off') {
            clearInterval(setInt)
            dispatch(setCount1(59))
            dispatch(setCount2(4))
        }
    })
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
                console.log(result.data)
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
                dispatch(setIndexBoard(indexBoard))
                dispatch(setBoardBase({ board: temp }))
                dispatch(setBoard(result.data.board))
                dispatch(count('on'))
                dispatch(setStatus('unsolved'))
                // dispatch(answerBoard({ board: temp }))
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
        dispatch(setBoardLoading(true))
        axios({
            method: 'POST',
            data: encodeParams(payload),
            url: 'https://sugoku.herokuapp.com/validate'
        })
        .then((result) => {
            console.log(result.data)
            dispatch(setStatus(result.data.status))
            dispatch(setBoardLoading(false))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setBoardLoading(false))
        })
    })
}

export const answerBoard = (payload) => {
    return ((dispatch) => {
        dispatch(count('off'))
        dispatch(setBoardLoading(true))
        axios({
            method: 'POST',
            data: encodeParams(payload),
            url: 'https://sugoku.herokuapp.com/solve'
        })
        .then((result) => {
            console.log(result.data)
            dispatch(setBoard(result.data.solution))
            dispatch(setBoardLoading(false))

        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setBoardLoading(false))
        })
    })
}