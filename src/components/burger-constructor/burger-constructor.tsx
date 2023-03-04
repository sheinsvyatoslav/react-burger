import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v1 } from "uuid";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  addConstructorIngredient,
  clearConstructor,
} from "../../services/slices/ingredients/ingredients";
import { createOrder } from "../../services/slices/order/order";
import { getCookie } from "../../utils/cookie";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

import styles from "./burger-constructor.module.scss";

export const BurgerConstructor = () => {
  const history = useHistory();
  const [isOrderPopupOpened, setIsOrderPopupOpened] = useState(false);
  const { ingredients, constructorIngredients } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  const bun = useMemo(() => {
    return constructorIngredients?.find((ingredient) => ingredient.type === "bun");
  }, [constructorIngredients]);

  const noBunIngredients = useMemo(() => {
    return constructorIngredients?.filter((ingredient) => ingredient.type !== "bun");
  }, [constructorIngredients]);

  const totalPrice = useMemo(() => {
    if (!constructorIngredients) {
      return 0;
    }

    return constructorIngredients?.reduce(
      (sum, ingredient) => sum + ingredient.price * (ingredient.type === "bun" ? 2 : 1),
      0
    );
  }, [constructorIngredients]);

  const handleOrderClick = () => {
    if (getCookie("accessToken")) {
      if (constructorIngredients) {
        dispatch(createOrder([...constructorIngredients.map((item) => item._id)]));
      }

      setIsOrderPopupOpened(true);
      dispatch(clearConstructor());
    } else {
      history.replace("/login");
    }
  };

  const [, ingridientsTarget] = useDrop({
    accept: "ingredients",
    drop(ingredient: { id: string }) {
      dispatch(
        addConstructorIngredient({
          draggedIngridient: ingredients?.find((item) => {
            return item._id === ingredient.id;
          }),
          dragId: v1(),
        })
      );
    },
  });

  return (
    <section className={`${styles.main} pb-13`}>
      <div
        className={`${styles.container} mt-25`}
        ref={ingridientsTarget}
        data-at-selector="burger-constructor_container"
      >
        {!bun && (
          <p className={`text text_type_main-medium ${styles.tip}`}>
            Пожалуйста, перенесите сюда булку для создания заказа
          </p>
        )}
        <div className="ml-8 pr-4 pl-4">
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        {noBunIngredients && (
          <div className={`${styles.cards} pr-2 pl-4`}>
            {noBunIngredients.map((item, i) => (
              <ConstructorCard item={item} key={item.dragId} index={i} />
            ))}
          </div>
        )}
        <div className="ml-8 pr-4 pl-4">
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      <div className={`${styles.button} mt-10 mb-10 pr-4`}>
        <div className={`${styles.price} mt-2 mb-2 mr-10 ml-5`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={handleOrderClick}
          disabled={!bun}
          aria-label="Оформить заказ"
          data-at-selector="create-order-button"
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpened={isOrderPopupOpened}
        handleClosePopup={() => setIsOrderPopupOpened(false)}
        title=""
      >
        <OrderDetails />
      </Modal>
    </section>
  );
};
