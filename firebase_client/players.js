import { db } from './index';
import { mapSnapshotToData } from '../utils/utils';

const playerRef = db.collection('players');

export const getAllPlayers = () => {
    return playerRef.get().then(mapSnapshotToData);
};

export const getPlayerBySessionId = (sessionId) => {
    return playerRef.where('sessionId', '==', sessionId)
        .get().then(snapshot => {
            const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
