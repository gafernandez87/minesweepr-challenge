import { db } from './index';
import { mapSnapshotToData } from '../utils/utils';

const gamesRef = db.collection('games');

export const getAllGames = () => {
    return gamesRef.get().then(mapSnapshotToData);
};

export const getGamesByStatus = (status) => {
    return gamesRef.where('status', '==', status)
        .get()
        .then(mapSnapshotToData);
};

export const getGamesBySessionId = (sessionId) => {
    return gamesRef.where('session_id', '==', sessionId)
        .get()
        .then(mapSnapshotToData);
}
;
