import { db } from './index';
import { mapSnapshotToData } from '../utils/utils';

const gamesRef = db.collection('games');

export const OPERATORS = {
    EQUALS: '=='
};

export const FIELDS = {
    SESSION_ID: 'session_id',
    STATUS: 'status'
};

export const getAllGames = () => {
    return gamesRef.get().then(mapSnapshotToData);
};

export const getGamesByFilter = (field, operator, value) => {
    return gamesRef.where(field, operator, value)
        .get()
        .then(mapSnapshotToData);
};
