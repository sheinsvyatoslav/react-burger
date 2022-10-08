import data from '../../utils/data.json'
import burgerConstructorStyles from './burger-constructor.module.css'
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  
  return (
    <section className={`${burgerConstructorStyles.container} ml-4 mr-4 pb-13`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }} className="mt-25">
        <div className="ml-8 pr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`${burgerConstructorStyles.cards} pr-2`}>
          {data.map((item, i) => (
            item.type !== 'bun' &&
            <div className={burgerConstructorStyles.card}>
              <div className="pr-2">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={item._id}
              />
            </div> 
          ))
          }
        </div>
        <div className="ml-8 pr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[data.length - 1].name}
            price={data[data.length - 1].price}
            thumbnail={data[data.length - 1].image}
          />
        </div>
      </div>
      <div className={`${burgerConstructorStyles.button} mt-10 mb-10`}>
        <div className={`${burgerConstructorStyles.price} mt-2 mb-2 mr-10 ml-5`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="submit">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;