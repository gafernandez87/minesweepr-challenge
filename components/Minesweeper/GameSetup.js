// Hooks
import { useState } from 'react';

// Utils
import { initialGameConfig, DIFFICULTY, GAME_STATUS } from 'utils/utils';

// Styles
import styles from './minesweeper.module.scss';

const GameSetup = ({ startGame, saveGame, gameStatus }) => {
    const [gameConfig, setGameConfig] = useState(initialGameConfig);
    const [difficulty, setDifficulty] = useState(initialGameConfig.difficulty);

    const changeDifficulty = (e) => {
        const currentDifficulty = e.target.value;
        if (currentDifficulty === DIFFICULTY.EASY) {
            setGameConfig(initialGameConfig);
        } else if (currentDifficulty === DIFFICULTY.NORMAL) {
            setGameConfig({
                n: 5,
                m: 5,
                bombs: 7,
                difficulty: DIFFICULTY.NORMAL
            });
        } else if (currentDifficulty === DIFFICULTY.HARD) {
            setGameConfig({
                n: 8,
                m: 8,
                bombs: 20,
                difficulty: DIFFICULTY.HARD
            });
        }
        setDifficulty(currentDifficulty);
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
                        <input type="text" value={gameConfig.n} placeholder="N" onChange={e => setGameConfig({ ...gameConfig, n: e.target.value })}/>
                    </div>
                    <div>
                        <label>Width</label>
                        <input type="text" value={gameConfig.m} placeholder="M" onChange={e => setGameConfig({ ...gameConfig, m: e.target.value })}/>
                    </div>
                    <div>
                        <label>Bombs</label>
                        <input type="text" value={gameConfig.bombs} placeholder="5" onChange={e => setGameConfig({ ...gameConfig, bombs: e.target.value })}/>
                    </div>
                </div>
            )}

            <button onClick={() => startGame(gameConfig)}>Start new game!</button>
            {gameStatus && gameStatus === GAME_STATUS.PLAYING && <button onClick={saveGame}>Save</button>}
        </div>
    );
};

export default GameSetup;
