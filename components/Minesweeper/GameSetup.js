import { useState } from 'react';
import styles from './minesweeper.module.scss';
import { BOARD_DEFAULT_SIZE } from 'components/Minesweeper/utils';

const DIFFICULTY = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
    CUSTOM: 'custom'
};

const GameSetup = ({ startGame }) => {
    const [n, setN] = useState(BOARD_DEFAULT_SIZE);
    const [m, setM] = useState(BOARD_DEFAULT_SIZE);
    const [bombs, setBombs] = useState(3);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);

    const handlePlay = () => {
        startGame(n, m, bombs);
    };

    const changeDifficulty = (e) => {
        const currentDifficulty = e.target.value;
        if (currentDifficulty === DIFFICULTY.EASY) {
            setN(DIFFICULTY.EASY);
            setM(DIFFICULTY.EASY);
            setBombs(3);
        } else if (currentDifficulty === DIFFICULTY.NORMAL) {
            setN(5);
            setM(5);
            setBombs(7);
        } else if (currentDifficulty === DIFFICULTY.HARD) {
            setN(8);
            setM(8);
            setBombs(20);
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
                        <input type="text" value={n} placeholder="N" onChange={e => setN(e.target.value)}/>
                    </div>
                    <div>
                        <label>Width</label>
                        <input type="text" value={m} placeholder="M" onChange={e => setM(e.target.value)}/>
                    </div>
                    <div>
                        <label>Bombs</label>
                        <input type="text" value={bombs} placeholder="5" onChange={e => setBombs(e.target.value)}/>
                    </div>
                </div>
            )}

            <button onClick={handlePlay}>Play!</button>
        </div>
    );
};

export default GameSetup;
