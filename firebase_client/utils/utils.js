export const mapSnapshotToData = (snapshot) => {
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
}
;
