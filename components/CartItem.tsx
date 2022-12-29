import React from 'react';
import Image from 'next/image';
import { ICartItem } from '../models';
import { removeItems } from '../redux/cart/cart.slice';
import { useDispatch } from 'react-redux';

const CartItem = ({ id, title, price, image, count }: ICartItem) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    dispatch(removeItems(id));
  };
  return (
    <div>
      <li key={id}>
        <Image src={image} alt={title} height={140} width={140} />
        <h2>Название: {title}</h2>
        <h2>Цена: {count * price * 70} ₽ </h2>
        <h3>Количество: {count}</h3>
        <button onClick={onClickRemove}>Удалить</button>
      </li>
    </div>
  );
};

export default CartItem;
