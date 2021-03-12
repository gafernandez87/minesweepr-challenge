import { db } from './index';
import { mapSnapshotToData, OPERATORS, COLLECTIONS } from 'firebase_client/utils/utils';

const playerRef = db.collection(COLLECTIONS.PLAYERS);

export const getAllPlayers = () => {
    return playerRef.get().then(mapSnapshotToData);
};

export const getPlayerBySessionId = (sessionId) => {
    return playerRef.where('sessionId', OPERATORS.EQUALS, sessionId)
        .get().then(snapshot => {
            const players = mapSnapshotToData(snapshot);
            return players[0];
        });
};

export const createPlayer = async (sessionId, email) => {
    const newPlayer = await playerRef.add({ sessionId, email });
    return {
        playerId: newPlayer.id,
        sessionId,
        email
    };
};
