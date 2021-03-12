export const TYPES = {
    SET_PLAYER: 'SET_PLAYER',
    SET_GAME: 'SET_GAME'
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
                ...payload
            }
        };
    }
    case TYPES.SET_GAME: {
        return {
            ...state,
            game: payload
        };
    }
    default:
        return state;
    }
}
