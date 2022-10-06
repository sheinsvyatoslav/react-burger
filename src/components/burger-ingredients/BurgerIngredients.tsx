import {useState, useEffect} from 'react';
import './BurgerIngredients.css'
import BurgerNavigation from '../burger-navigation/BurgerNavigation';
import IngridientCard from '../ingridient-card/IngridientCard'
import data from '../../utils/data.json'

function BurgerIngredients() {
  const [buns, setBuns] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [fillings, setFillings] = useState([]);

  /*
  const sortData = (data: Array<{type: string}>) => {
    for(let i = 0; i < data.length; i++) {
      if(data[i].type === 'bun') {
        console
      }
    } 
  }

  useEffect(() => {
    sortData(data)
  }, [])
  */
  
  return (
    <section className="burger-ingredients mr-10">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation />
      <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
      <div className="burger-ingredients__cards">
        {data.map((item, i) => (
          item.type === 'bun' &&
          <IngridientCard 
          image={item.image}
          name={item.name}
          price={item.price}
          key={item._id}
          />
        ))
        }
      </div>
      <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
      <div className="burger-ingredients__cards">
        {data.map((item, i) => (
          item.type === 'sauce' &&
          <IngridientCard 
          image={item.image}
          name={item.name}
          price={item.price}
          key={item._id}
          />
        ))
        }
      </div>
      <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
      <div className="burger-ingredients__cards">
        {data.map((item, i) => (
          item.type === 'main' &&
          <IngridientCard 
          image={item.image}
          name={item.name}
          price={item.price}
          key={item._id}
          />
        ))
        }
      </div>
    </section>
  );
}

export default BurgerIngredients;