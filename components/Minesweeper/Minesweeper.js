import styles from './minesweeper.module.scss';

import { generateCode, mapCodeToObject, BOARD_DEFAULT_SIZE } from 'components/Minesweeper/utils';

import { useState } from 'react';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';

const Minesweeper = () => {
    const [game, setGame] = useState({});

    const startGame = (n, m, bombs) => {
        const code = generateCode(n, m, bombs);
        const bombsObj = mapCodeToObject(code);
        setGame({
            n,
            m,
            bombs,
            code,
            bombsObj
        });
    };

    return (
        <section className={styles.gameArea}>
            <GameSetup startGame={startGame} />
            {game.code && <GameBoard game={game} setGame={setGame} />}

        </section>
    );
};

export default Minesweeper;
