export const CELL_SIZE = 60;
export const BOARD_DEFAULT_SIZE = 4;

export const GAME_STATUS = {
    PLAYING: 'playing',
    WIN: 'win',
    GAME_OVER: 'GAME_OVER'
};

export const DIFFICULTY = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
    CUSTOM: 'custom'
};

export const initialGameConfig = {
    n: BOARD_DEFAULT_SIZE,
    m: BOARD_DEFAULT_SIZE,
    bombs: 1,
    difficulty: DIFFICULTY.EASY
};

export const CELL_STATUS = {
    COVERED: 'c',
    UNCOVERED: 'u',
    FLAGGED: 'f'
};

export const BOMB_STATUS = {
    ACTIVE: 't',
    INACTIVE: 'f'
};

export const loadPlayerBySessionId = sessionId => {
    return fetch(`/api/players/${sessionId}`)
        .then(res => res.json());
};

export const loadGameById = (sessionId, gameId) => {
    return fetch(`/api/players/${sessionId}/games/${gameId}`)
        .then(res => res.json());
};

export function isSigninSignUp (route) {
    return route === '/login' || route === '/signup' || route === '/' || route === '/_error';
}

export function handleRedirect (router, sessionId) {
    if (sessionId && isSigninSignUp(router.route)) {
        console.log('redirecting to /dashboard');
        router.push('/dashboard');
        return true;
    }

    if (!sessionId && !isSigninSignUp(router.route)) {
        router.push('/login');
        return true;
    }
    return false;
}
