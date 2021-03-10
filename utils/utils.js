export const GAME_STATUSES = {
    IN_PROGRESS: "IN_PROGRESS",
    GAME_OVER: "GAME_OVER"
};

export const mapSnapshotToData = (snapshot) => {
    return snapshot.docs.map(snap => {
        return {
            id: snap.id,
            ...snap.data()
        }
    })
}