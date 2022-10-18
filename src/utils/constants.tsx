import PropTypes from 'prop-types';

export type Card = {
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

export const cardTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates : PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}).isRequired;

export const emptyCard = {
  _id: '',
  name: '', 
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates : 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
}

export const INGREDIENT_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main'
};

