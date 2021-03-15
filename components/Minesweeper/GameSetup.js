// Hooks
import { NOTIFICATION_TYPE } from 'components/Commons/Notification';
import { useState } from 'react';

// Utils
import { initialGameConfig, DIFFICULTY, GAME_STATUS } from 'utils/utils';

// Styles
import styles from './minesweeper.module.scss';

const GameSetup = ({ startGame, saveGame, gameStatus, isAnonymous, showNotification }) => {
    const [gameConfig, setGameConfig] = useState(initialGameConfig);
    const [difficulty, setDifficulty] = useState(initialGameConfig.difficulty);

    const changeDifficulty = (e) => {
        const currentDifficulty = parseInt(e.target.value);
        if (currentDifficulty === DIFFICULTY.EASY) {
            setGameConfig(initialGameConfig);
        } else if (currentDifficulty === DIFFICULTY.NORMAL) {
            setGameConfig({
                n: 5,
                m: 5,
                bombs: 5,
                difficulty: DIFFICULTY.NORMAL
            });
        } else if (currentDifficulty === DIFFICULTY.HARD) {
            setGameConfig({
                n: 8,
                m: 8,
                bombs: 15,
                difficulty: DIFFICULTY.HARD
            });
        } else if (currentDifficulty === DIFFICULTY.CUSTOM) {
            setGameConfig({
                ...gameConfig,
                difficulty: DIFFICULTY.CUSTOM
            });
        }
        setDifficulty(currentDifficulty);
    };

    const changeN = e => {
        const value = parseInt(e.target.value) || 0;
        if (value > 40) {
            showNotification('Board size max is 40x40', NOTIFICATION_TYPE.WARN, 3000);
            return gameConfig.n;
        } else {
            setGameConfig({ ...gameConfig, n: value });
        }
    };

    const changeM = e => {
        const value = parseInt(e.target.value) || 0;
        if (value > 40) {
            showNotification('Board size max is 40x40', NOTIFICATION_TYPE.WARN, 3000);
            return gameConfig.m;
        } else {
            setGameConfig({ ...gameConfig, m: value });
        }
    };

    const changeBombs = e => {
        const value = parseInt(e.target.value) || 0;
        const maxBombsAllowed = parseInt((gameConfig.n * gameConfig.m) / 2);
        if (value > maxBombsAllowed) {
            showNotification(`Max bombs allowed: ${maxBombsAllowed}`, NOTIFICATION_TYPE.WARN, 3000);
            return gameConfig.bombs;
        } else {
            setGameConfig({ ...gameConfig, bombs: value });
        }
    };

    return (
        <div className={styles.setup}>
            <div className={styles.difficulty}>
                <label>Difficutly</label>
                <select value={difficulty} onChange={changeDifficulty}>
                    <option value={DIFFICULTY.EASY}>EASY</option>
                    <option value={DIFFICULTY.NORMAL}>NORMAL</option>
                    <option value={DIFFICULTY.HARD}>HARD</option>
                    <option value={DIFFICULTY.CUSTOM}>CUSTOM</option>
                </select>
            </div>
            {difficulty === DIFFICULTY.CUSTOM && (
                <div className={styles.customGame}>
                    <div>
                        <label>Height</label>
                        <input type="text"
                            value={gameConfig.n}
                            placeholder="N"
                            onChange={changeN}
                        />
                    </div>
                    <div>
                        <label>Width</label>
                        <input type="text"
                            value={gameConfig.m}
                            placeholder="M"
                            onChange={changeM}
                        />
                    </div>
                    <div>
                        <label>Bombs</label>
                        <input type="text"
                            value={gameConfig.bombs}
                            placeholder="5"
                            onChange={changeBombs}
                        />
                    </div>
                </div>
            )}

            <button onClick={() => startGame(gameConfig)}>Start new game!</button>
            {!isAnonymous && gameStatus && gameStatus === GAME_STATUS.PLAYING && <button onClick={saveGame}>Save</button>}
        </div>
    );
};

export default GameSetup;
