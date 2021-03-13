export const TYPES = {
    SET_PLAYER: 'SET_PLAYER',
    SET_GAME: 'SET_GAME',
    CLEAR_GAME: 'CLEAR_GAME'
};

export const initialState = {
    player: null,
    game: null
};

export function sessionReducer (state, action) {
    const { type, payload } = action;
    switch (type) {
    case TYPES.SET_PLAYER: {
        return {
            ...state,
            player: {
                ...state.player,
                ...payload
            }
        };
    }
    case TYPES.SET_GAME: {
        return {
            ...state,
            game: {
                ...state.game,
                ...payload
            }
        };
    }
    case TYPES.CLEAR_GAME: {
        return {
            ...state,
            game: null
        };
    }
    default:
        return state;
    }
}
