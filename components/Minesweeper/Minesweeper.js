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
    const [game, setGame] = useState(null);
    const [notification, setNotification] = useState({});
    const [sessionState, dispatch] = useContext(SessionContext);

    useEffect(() => {
        console.log('EFFECT');
        checkGameStatus();
        if (!game?.code && sessionState.game) {
            setGame(sessionState.game);
        }
        if (gameId) {
            let flag = true;
            if (sessionState?.player) {
                const game = sessionState?.game || null;
                if (game) {
                    flag && setGame(game);
                } else {
                    const sessionId = sessionState?.player?.sessionId;
                    if (sessionId !== 'anonymous') {
                        fetch(`/api/players/${sessionId}/games/${gameId}`)
                            .then(res => res.json())
                            .then(data => {
                                flag && setGame(data);
                            });
                    }
                }
            }
            return () => (flag = false);
        }
    }, [game, sessionState, gameId]);

    const checkGameStatus = () => {
        if (game) {
            if (game.status && game.status === GAME_STATUS.WIN) {
                showNotification('YOU WIN!', NOTIFICATION_TYPE.SUCCESS);
            } else if (game.status && game.status === GAME_STATUS.GAME_OVER) {
                showNotification('GAME OVER!', NOTIFICATION_TYPE.ERROR);
            }
        }
    };

    const startGame = (gameConfig) => {
        delete gameConfig.bombsObj;
        setGame({
            ...gameConfig,
            status: GAME_STATUS.PLAYING
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

    const saveGame = () => {
        const playerId = sessionState.player.sessionId;
        const gameId = sessionState.game.id;
        fetch(`/api/players/${playerId}/games/${gameId}`, {
            method: 'PATCH',
            body: game.code
        })
            .then(_ => showNotification('Game saved', NOTIFICATION_TYPE.SUCCESS, 3000))
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
                saveGame={saveGame}
                gameStatus={game?.status}
                isAnonymous={sessionState?.player?.sessionId === 'anonymous'}
            />
            {game?.code && <GameBoard game={game} setGame={setGame} />}

        </section>
    );
};

export default Minesweeper;
