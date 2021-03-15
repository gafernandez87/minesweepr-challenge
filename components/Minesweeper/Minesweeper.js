// Components
import { generateCode, mapCodeToObject } from 'components/Minesweeper/utils';
import { Notification, NOTIFICATION_TYPE } from 'components/Commons/Notification';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';

// Hooks
import { useEffect, useState, useContext } from 'react';

// Context
import { SessionContext } from 'contexts/SessionContext';

// Styles
import styles from './minesweeper.module.scss';
import { GAME_STATUS } from 'utils/utils';
import { TYPES } from 'reducers/SessionReducer';

// Utils
import moment from 'moment';

const Minesweeper = ({ gameId }) => {
    const [notification, setNotification] = useState({});
    const [sessionState, dispatch] = useContext(SessionContext);
    const [initialGameStatus, setInitialGame] = useState(null);

    useEffect(() => {
        let flag = true;
        checkGameStatus(flag);

        const sessionId = sessionState?.player?.sessionId;
        if (gameId && !sessionState.game) {
            if (sessionId && sessionId !== 'anonymous') {
                fetch(`/api/players/${sessionId}/games/${gameId}`)
                    .then(res => flag && res.json())
                    .then(newGame => {
                        flag && dispatch({
                            type: TYPES.SET_GAME,
                            payload: newGame
                        });
                        flag && setInitialGame(newGame.status);
                    });
            }
        }
        return () => (flag = false);
    }, [sessionState, gameId]);

    const checkGameStatus = (flag) => {
        const status = sessionState.game?.status;
        const playerId = sessionState.player?.sessionId;

        const message = status === GAME_STATUS.WIN ? 'YOU WIN!' : 'GAME OVER!';
        const type = status === GAME_STATUS.WIN ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR;

        // Only save if the game change from playing to another state
        if (status && status !== initialGameStatus &&
            (status === GAME_STATUS.WIN || status === GAME_STATUS.GAME_OVER)) {
            if (playerId === 'anonymous') {
                flag && showNotification(message, type);
            } else {
                saveGame(status)
                    .then(_ => {
                        const message = status === GAME_STATUS.WIN ? 'YOU WIN!' : 'GAME OVER!';
                        const type = status === GAME_STATUS.WIN ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR;
                        flag && showNotification(message, type);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    };

    const startGame = (gameConfig) => {
        setNotification({});

        dispatch({
            type: TYPES.SET_GAME,
            payload: {
                ...gameConfig,
                status: GAME_STATUS.PLAYING
            }
        });
    };

    const createGame = (gameConfig) => {
        const playerId = sessionState.player.sessionId;
        const { n, m, bombs } = gameConfig;
        const now = moment().format();

        const code = generateCode(n, m, bombs);
        const bombsObj = mapCodeToObject(code);
        gameConfig.code = code;
        gameConfig.bombsObj = bombsObj;

        if (playerId === 'anonymous') {
            startGame(gameConfig);
        } else {
            const saveObject = { ...gameConfig, startedDate: now, lastUpdate: now };
            delete saveObject.bombsObj;
            fetch(`/api/players/${playerId}/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saveObject)
            })
                .then(res => res.json())
                .then(newGame => {
                    dispatch({
                        type: TYPES.SET_GAME,
                        payload: newGame
                    });
                    startGame(gameConfig);
                })
                .catch(err => {
                    console.error(err);
                    showNotification('There was an error trying to start the game, try again!', NOTIFICATION_TYPE.ERROR);
                });
        }
    };

    const saveGame = (status) => {
        const playerId = sessionState.player.sessionId;
        const gameId = sessionState.game.id;
        const lastUpdate = moment().format();
        return fetch(`/api/players/${playerId}/games/${gameId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                code: sessionState.game.code,
                status,
                lastUpdate
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const handleSaveGame = () => {
        saveGame()
            .then(_ => showNotification('Game saved!', NOTIFICATION_TYPE.SUCCESS, 3000))
            .catch(err => {
                console.error(err);
                showNotification('Game save failed, try again!', NOTIFICATION_TYPE.ERROR);
            });
    };

    const showNotification = (message, type, hide) => {
        setNotification({
            message,
            type
        });
        if (hide) {
            setTimeout(() => showNotification(null), hide);
        }
    };

    return (
        <section className={styles.gameArea}>
            {notification.message &&
                <Notification message={notification.message} type={notification.type} />
            }

            <GameSetup
                startGame={createGame}
                saveGame={handleSaveGame}
                gameStatus={sessionState.game?.status}
                isAnonymous={sessionState?.player?.sessionId === 'anonymous'}
            />
            {sessionState.game?.code && <GameBoard />}

        </section>
    );
};

export default Minesweeper;
