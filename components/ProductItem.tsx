import Image from 'next/image';
import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IProduct } from '../models';
import styles from '../styles/Index.module.scss';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Props {
  product: IProduct;
}

export default function PrdouctItem({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useActions();
  const { likeItem, dislikeItem } = useActions();

  const [like, setLike] = useState<boolean>(false);

  const { cart, favorite } = useTypedSelector((state) => state);
  const existsInCart = cart.some((p) => p.id === product.id);
  const minusOne = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const plusOne = () => {
    setQuantity(quantity + 1);
  };

  const alreadyLiked = favorite.some((p) => p.id === product.id);

  const onLikeClick = () => {
    if (!like && !alreadyLiked) {
      likeItem(product);
    } else {
      dislikeItem({ id: product.id });
    }
    setLike(!like);
  };
  return (
    <div key={product.id} className={styles.singleProduct}>
      <div className={styles.image}>
        {product.rating.count > 300 && (
          <div className={styles.hit}>
            <span>Хит</span>
          </div>
        )}
        <Image src={product.image} alt={product.title} height={220} width={220} />
      </div>
      <p className={styles.category}>{product.category}</p>
      <p className={styles.description}>{product.description}</p>
      <h2>
        {product.price * 70} ₽/ <span className={styles.category}>шт.</span>
      </h2>
      {existsInCart ? (
        <div className={styles.isInCart}>В корзине</div>
      ) : (
        <div className={styles.low}>
          <div className={styles.cardFooter}>
            <button className={styles.addToCart} onClick={() => !existsInCart && addItem(product)}>
              В корзину
            </button>
            <div className={styles.quantityChanger}>
              <button onClick={minusOne}>-</button>
              <div>{quantity}</div>
              <button onClick={plusOne}>+</button>
            </div>
          </div>
          <div className={styles.like} onClick={onLikeClick}>
            {like ? <BsHeartFill /> : <BsHeart />}
          </div>
        </div>
      )}
    </div>
  );
}
