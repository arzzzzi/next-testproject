import Image from 'next/image';
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICartItem, IProduct } from '../models';
import styles from '../styles/Index.module.scss';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from '../redux/cart/cart.slice';
import { dislikeItem, likeItem } from '../redux/favorites/favorite.slice';

export default function PrdouctItem({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: IProduct) {
  const [like, setLike] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { cart, favorite } = useTypedSelector((state) => state);
  const existsInCart = cart.items.some((p) => p.id === id);

  const item: ICartItem = {
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
    count: 1,
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const onAddClick = () => {
    let totalPrice = qty * price;
    const tempProduct = {
      ...item,
      count: qty,
      totalPrice,
    };
    dispatch(addItems(tempProduct));
  };

  const alreadyLiked = favorite.some((p) => p.id === id);

  const onDislikeClick = () => {
    dispatch(dislikeItem(item));
    setLike(false);
  };

  const onLikeClick = () => {
    if (!like && !alreadyLiked) {
      dispatch(likeItem(item));
    }
    setLike(true);
  };
  return (
    <div key={id} className={styles.singleProduct}>
      <div className={styles.image}>
        {rating.count > 300 && (
          <div className={styles.hit}>
            <span>Хит</span>
          </div>
        )}
        <Image src={image} alt={title} height={220} width={220} />
      </div>
      <p className={styles.category}>{category}</p>
      <p className={styles.description}>{description}</p>
      <h2>
        {price * 70} ₽/ <span className={styles.category}>шт.</span>
      </h2>
      <div className={styles.low}>
        {existsInCart ? (
          <div className={styles.isInCart}>В корзине</div>
        ) : (
          <div className={styles.cardFooter}>
            <button className={styles.addToCart} onClick={() => !existsInCart && onAddClick()}>
              В корзину
            </button>
            <div className={styles.quantityChanger}>
              <button onClick={() => decreaseQty()}>-</button>
              <div>{qty}</div>
              <button onClick={() => increaseQty()}>+</button>
            </div>
          </div>
        )}
        <div className={styles.like}>
          {like ? <BsHeartFill onClick={onDislikeClick} /> : <BsHeart onClick={onLikeClick} />}
        </div>
      </div>
    </div>
  );
}
