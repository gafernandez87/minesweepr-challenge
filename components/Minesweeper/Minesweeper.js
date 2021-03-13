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

const Minesweeper = ({ gameId }) => {
    const [notification, setNotification] = useState({});
    const [sessionState, dispatch] = useContext(SessionContext);
    const [initialGameStatus, setI] = useState(null);

    useEffect(() => {
        checkGameStatus();

        const sessionId = sessionState?.player?.sessionId;
        let flag = true;
        if (gameId && !sessionState.game) {
            if (sessionId && sessionId !== 'anonymous') {
                fetch(`/api/players/${sessionId}/games/${gameId}`)
                    .then(res => flag && res.json())
                    .then(newGame => {
                        flag && dispatch({
                            type: TYPES.SET_GAME,
                            payload: newGame
                        });
                        flag && setI(newGame.status);
                    });
            }
        }
        return () => (flag = false);
    }, [sessionState, gameId]);

    const checkGameStatus = () => {
        const status = sessionState.game?.status;
        // Only save if the game change from playing to another state
        if (status && initialGameStatus &&
            (status === GAME_STATUS.WIN || status === GAME_STATUS.GAME_OVER) &&
            status !== initialGameStatus) {
            saveGame(status)
                .then(_ => {
                    const message = status === GAME_STATUS.WIN ? 'YOU WIN!' : 'GAME OVER!';
                    const type = status === GAME_STATUS.WIN ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR;
                    showNotification(message, type);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    const startGame = (gameConfig) => {
        delete gameConfig.bombsObj;
        dispatch({
            type: TYPES.SET_GAME,
            payload: {
                ...gameConfig,
                status: GAME_STATUS.PLAYING
            }
        });
        setNotification({});
    };

    const createGame = (gameConfig) => {
        const playerId = sessionState.player.sessionId;
        const { n, m, bombs } = gameConfig;

        const code = generateCode(n, m, bombs);
        gameConfig.code = code;

        if (playerId === 'anonymous') {
            const bombsObj = mapCodeToObject(code);
            gameConfig.bombsObj = bombsObj;
            startGame(gameConfig);
        } else {
            fetch(`/api/players/${playerId}/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameConfig)
            })
                .then(res => res.json())
                .then(newGame => {
                    dispatch({
                        type: TYPES.SET_GAME,
                        payload: newGame
                    });
                    const bombsObj = mapCodeToObject(code);
                    gameConfig.bombsObj = bombsObj;
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
        return fetch(`/api/players/${playerId}/games/${gameId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                code: sessionState.game.code,
                status
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
