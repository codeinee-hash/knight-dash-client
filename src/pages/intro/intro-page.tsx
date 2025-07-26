import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/model/use-auth';
import { BoardComponent } from '../../features/board';
import { Board } from '../../features/board/model/board';
import Logo2 from '../../shared/assets/images/geeks 2.png';
import Logo from '../../shared/assets/images/Logo.svg';
import { Modal } from '../../shared/ui/modal/modal';
import { MultiContainer } from '../../shared/ui/multi-container/MultiContainer';
import { ROUTES, rules } from '../../shared/utils/consts/consts';
import { useGame } from '../../shared/utils/hooks/use-game';
import { GameModeSelect } from './game-mode-select';
import styles from './intro-page.module.scss';

const IntroPage: FC = () => {
  const [board, setBoard] = useState(new Board());
  const setIsGameOver = useGame((s) => s.setIsGameOver);
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <MultiContainer className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={Logo2} alt='geeks logo' />
      </div>
      <div className={styles.room}>
        <BoardComponent board={board} setBoard={setBoard} />
      </div>
      <Modal
        isOpen={true}
        title='Rules of the game'
        className={styles.customModal}
      >
        <div className={styles.content}>
          <div className={styles.geeks}>
            <span className={styles.name}>GEEKS</span>
            <div className={styles.logoContainer}>
              <img src={Logo} alt='Logo' />
            </div>
          </div>
          <ul className={styles.rules}>
            {rules.map((rule) => (
              <li key={rule.id}>{rule.text}</li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          <button
            type='button'
            className={styles.toLeaderboard}
            onClick={() => navigate(ROUTES.LEADERBOARDS)}
          >
            Leaderboards
          </button>
          <GameModeSelect />
        </div>

        <div className={styles.btns}>
          <button
            type='button'
            onClick={() => {
              navigate(ROUTES.GAME_ROOM);
              setIsGameOver(false);
            }}
            className={styles.startButton}
          >
            Start the game
          </button>
          <button onClick={logout} type='button' className={styles.quit}>
            Exit
          </button>
        </div>
      </Modal>
    </MultiContainer>
  );
};

export const Component = IntroPage;
