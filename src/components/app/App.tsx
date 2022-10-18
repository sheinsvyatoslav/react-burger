import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { emptyCard, Card } from '../../utils/constants';
import { getIngredients } from '../../utils/api';
import { IngredientsContext } from '../../contexts/ingredientsContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderPopupOpened, setIsOrderPopupOpened] = useState(false);
  const [isIngredientPopupOpened, setIsIngredientPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(emptyCard);
  const [bun, setBun] = useState(emptyCard);
  const [noBunIngredients, setNoBunIngredients] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOpenOrderPopupClick = () => {
    setSelectedCard(emptyCard);
    setIsOrderPopupOpened(true);
  }

  const handleClosePopupClick = () => {
    setIsOrderPopupOpened(false);
    setIsIngredientPopupOpened(false);
  }

  const handleOpenIngredientPopupClick = (card: Card) => {
    setSelectedCard(card);
    setIsIngredientPopupOpened(true);
  }

  useEffect(() => {
    getIngredients()
      .then((result: any) => {
        setIngredients(result.data);
        const bunIngredient = result.data.find((item: Card) => item.type === 'bun');
        const noBun = result.data.filter((item: Card) => item.type !== 'bun');
        setBun(bunIngredient);
        setNoBunIngredients(noBun);
      })
      .catch((err: Error) => {
        console.log(err);
        alert(err);
      })
  }, []);

  return (
    <IngredientsContext.Provider value={ingredients}>
      <AppHeader />
      <main className={styles.menu}>
        <BurgerIngredients
          onOpenIngredientPopup={handleOpenIngredientPopupClick} 
          selectedCard={selectedCard}
          onClosePopup={handleClosePopupClick}
          isIngredientPopupOpened={isIngredientPopupOpened}
        />
        <BurgerConstructor  
          onOpenOrderPopup={handleOpenOrderPopupClick}
          isOrderPopupOpened={isOrderPopupOpened}
          onClosePopup={handleClosePopupClick}
          bun={bun}
          noBunIngredients={noBunIngredients}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </main>
    </IngredientsContext.Provider>
  );
}

export default App;
