import { useState, useEffect } from 'react';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import burgerConstructorStyles from './burger-constructor.module.css'
import { createOrder } from '../../utils/api';
import { cardTypes } from '../../utils/constants';

BurgerConstructor.propTypes = {
  handleOpenOrderPopup: PropTypes.func.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
  isOrderPopupOpened: PropTypes.bool.isRequired,
  bun: cardTypes,
  noBunIngredients: PropTypes.arrayOf(cardTypes).isRequired,
  totalPrice: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

function BurgerConstructor({ 
  handleOpenOrderPopup, 
  handleClosePopup,
  isOrderPopupOpened,
  bun,
  noBunIngredients,
  totalPrice,
  setTotalPrice,
}) {

  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(
    () => {
      const total = noBunIngredients.reduce(((acc, item) => acc + item.price), 0) + (bun.price * 2);
      setTotalPrice(total);
    },
    [bun, noBunIngredients, setTotalPrice]
  );

  const handleClickOrder = () => {
    createOrder([bun._id, ...noBunIngredients.map(item => item._id)])
    .then(result => setOrderNumber(result.order.number))
    .catch(err => {
      alert(err);
      console.log(err);
    });
    handleOpenOrderPopup();
  }

  return (
    <section className={`${burgerConstructorStyles.main} ml-4 mr-4 pb-13`}>
      <div className={`${burgerConstructorStyles.container} mt-25`}>
        <div className="ml-8 pr-4">
          {bun && 
            <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
          }
        </div>
        <div className={`${burgerConstructorStyles.cards} pr-2`}>
          {noBunIngredients.map(item => (
            <div className={burgerConstructorStyles.card} key={item._id}>
              <div className="pr-2">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))
          }
        </div>
        <div className="ml-8 pr-4">
          {bun && 
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            />
          }
        </div>
      </div>
      <div className={`${burgerConstructorStyles.button} mt-10 mb-10`}>
        <div className={`${burgerConstructorStyles.price} mt-2 mb-2 mr-10 ml-5`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="submit" onClick={handleClickOrder}>Оформить заказ</Button>
      </div>
      <Modal isOpened={isOrderPopupOpened} handleClosePopup={handleClosePopup} title=''>
        <OrderDetails orderNumber={orderNumber}/>
      </Modal>
    </section>
  );
}

export default BurgerConstructor;