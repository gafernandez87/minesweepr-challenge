// Components
import { generateCode, mapCodeToObject } from 'components/Minesweeper/utils';
import { Notification, NOTIFICATION_TYPE } from 'components/Commons/Notification';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';

// Hooks
import { useState } from 'react';

// Styles
import styles from './minesweeper.module.scss';

const Minesweeper = () => {
    const [game, setGame] = useState({});

    const startGame = (gameConfig) => {
        const { n, m, bombs } = gameConfig;
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
            {game.status &&
                <Notification
                    message={`You ${game.status}!`}
                    type={game.status === 'win' ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR}
                />
            }

            <GameSetup startGame={startGame} />
            {game.code && <GameBoard game={game} setGame={setGame} />}

        </section>
    );
};

export default Minesweeper;
