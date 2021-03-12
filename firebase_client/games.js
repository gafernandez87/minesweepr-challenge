import { db } from './index';

import { mapSnapshotToData, COLLECTIONS } from 'firebase_client/utils/utils';
import { GAME_STATUS } from 'utils/utils';

const gamesRef = db.collection(COLLECTIONS.GAMES);

export const getAllGames = () => {
    return gamesRef.get().then(mapSnapshotToData);
};

export const getGamesByFilter = (field, operator, value) => {
    return gamesRef.where(field, operator, value)
        .get()
        .then(mapSnapshotToData);
};

export const createGame = async (sessionId, gameConfig) => {
    const status = GAME_STATUS.PLAYING;
    const newGame = await gamesRef.add({
        sessionId,
        ...gameConfig,
        status
    });
    return {
        id: newGame.id,
        sessionId,
        status,
        ...gameConfig
    };
};

export const saveGame = async (gameId, code) => {
    try {
        await gamesRef.doc(gameId).update({ code });
        return true;
    } catch (err) {
        return false;
    }
};

export const getGameById = async (sessionId, gameId) => {
    const doc = await gamesRef.doc(gameId);
    const gameRef = await doc.get();
    const game = gameRef.data();

    if (game.sessionId === sessionId) {
        return {
            id: gameId,
            ...game
        };
    } else {
        return null;
    }
};
