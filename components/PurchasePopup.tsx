import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { THANKS_TEXT } from '@shared';
import styles from '@styles/cart.module.scss';

const PurchasePopup: FC<{
  setShown: Dispatch<SetStateAction<boolean>>;
}> = ({ setShown }) => {
  const handleClick = (): void => {
    setShown(false);
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        setShown(false);
      }
    },
    [setShown]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className={styles.popup}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.popup_content}
        onClick={(e) => e.stopPropagation}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <p>{THANKS_TEXT}</p>
        <Image src="/assets/images/thankYou.png" width={200} height={200} />
      </div>
    </div>
  );
};

export default PurchasePopup;
