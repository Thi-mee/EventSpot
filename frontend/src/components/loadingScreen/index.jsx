
import style from './LoadingScreen.module.css'


const LoadingScreen = () => {
  return (
    <div>
      <div className={style['loading-screen']}>
        <div className={style['lds-roller']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;