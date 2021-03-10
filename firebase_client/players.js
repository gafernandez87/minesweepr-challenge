import { db } from './index';

const playerRef = db.collection("players");

export const getAllPlayers = () => {
    return playerRef.get().then(snapshot => {
        const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        return players;
    })
}