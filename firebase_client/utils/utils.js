export const mapSnapshotToData = (snapshot) => {
    console.log(snapshot.docs);
    return snapshot.docs.map(snap => {
        return {
            id: snap.id,
            ...snap.data()
        };
    });
};

export const OPERATORS = {
    EQUALS: '=='
};

export const COLLECTIONS = {
    PLAYERS: 'players',
    GAMES: 'games'
};
