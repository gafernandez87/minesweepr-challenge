import { db } from './index';
import { mapSnapshotToData } from '../utils/utils';

const gamesRef = db.collection("games");

export const getAllGames = () => {
    return gamesRef.get().then(mapSnapshotToData)
}

export const getGamesByStatus = (status) => {
    return gamesRef.where('status', '==', status)
    .get()
    .then(mapSnapshotToData);
};
