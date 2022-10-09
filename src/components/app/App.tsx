import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import styles from './app.module.css';
import { emptyCard } from '../../utils/constants';

function App() {
  const [ingridients, setIngridients] = useState([]);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(emptyCard)

  type Card = {
    _id: string,
    name: string, 
    type: string,
    proteins: number,
    fat: number,
    carbohydrates : number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
  };

  const handleOpenPopupClick = () => {
    setSelectedCard(emptyCard);
    setIsPopupOpened(true);
  }

  const handleClosePopupClick = () => {
    setIsPopupOpened(false);
  }

  const handleSetCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsPopupOpened(true);
  }

  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePopupClick();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    } 
  }, [])

  const getData = () => {
    return fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then(result => {
        setIngridients(result.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div >
      <AppHeader />
      <main className={styles.menu}>
        <BurgerIngredients ingridients={ingridients} onOpenIngridientPopup={handleSetCardClick} />
        <BurgerConstructor ingridients={ingridients} onOpenOrderPopup={handleOpenPopupClick}/>
      </main>
      <Modal isOpened={isPopupOpened} onClosePopup={handleClosePopupClick} card={selectedCard} />
    </div>
  );
}

export default App;
