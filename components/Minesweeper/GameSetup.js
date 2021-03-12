import { useState } from 'react';
import styles from './minesweeper.module.scss';
import { BOARD_DEFAULT_SIZE } from 'components/Minesweeper/utils';

const DIFFICULTY = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
    CUSTOM: 'custom'
};

const initialConfig = {
    n: BOARD_DEFAULT_SIZE,
    m: BOARD_DEFAULT_SIZE,
    bombs: 1,
    difficulty: DIFFICULTY.EASY
};

const GameSetup = ({ startGame }) => {
    const [gameConfig, setGameConfig] = useState(initialConfig);
    const [difficulty, setDifficulty] = useState(initialConfig.difficulty);

    const changeDifficulty = (e) => {
        const currentDifficulty = e.target.value;
        if (currentDifficulty === DIFFICULTY.EASY) {
            setGameConfig(initialConfig);
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
                    <label>Board Dimension</label>
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

            <button onClick={() => startGame(gameConfig)}>Play!</button>
        </div>
    );
};

export default GameSetup;
