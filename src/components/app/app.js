import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { emptyCard } from '../../utils/constants';
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

  const handleOpenOrderPopup = () => {
    setSelectedCard(emptyCard);
    setIsOrderPopupOpened(true);
  }

  const handleClosePopup = () => {
    setIsOrderPopupOpened(false);
    setIsIngredientPopupOpened(false);
  }

  const handleOpenIngredientPopup = card => {
    setSelectedCard(card);
    setIsIngredientPopupOpened(true);
  }

  useEffect(() => {
    getIngredients()
      .then(result => {
        setIngredients(result.data);
        const bunIngredient = result.data.find(item => item.type === 'bun');
        const noBun = result.data.filter(item => item.type !== 'bun');
        setBun(bunIngredient);
        setNoBunIngredients(noBun);
      })
      .catch(err => {
        console.log(err);
        alert(err);
      })
  }, []);

  return (
    <IngredientsContext.Provider value={ingredients}>
      <AppHeader />
      <main className={styles.menu}>
        <BurgerIngredients
          handleOpenIngredientPopup={handleOpenIngredientPopup} 
          selectedCard={selectedCard}
          handleClosePopup={handleClosePopup}
          isIngredientPopupOpened={isIngredientPopupOpened}
        />
        <BurgerConstructor  
          handleOpenOrderPopup={handleOpenOrderPopup}
          isOrderPopupOpened={isOrderPopupOpened}
          handleClosePopup={handleClosePopup}
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
