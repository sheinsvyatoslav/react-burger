import React from 'react';
import data from '../../utils/data.json'
import OrderCard from '../order-card/OrderCard'
import './BurgerConstructor.css'
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  
  return (
    <section className="burger-constructor pl-4 pr-4 pb-13">
      <div className="burger-constructor__cards pr-8 mt-25">
        {data.map((item, i) => (
          <OrderCard
          image={item.image}
          name={item.name}
          price={item.price}
          key={item._id}
          />
        ))
        }
      </div>
      <div className="burger-constructor__buy-button mt-10 mb-10">
        <div className="burger-constructor__price mt-2 mb-2 mr-10 ml-5">
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="submit">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;