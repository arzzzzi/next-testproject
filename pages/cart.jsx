import Image from 'next/image';
import Link from 'next/link';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function CartPage() {
  const { cart } = useTypedSelector((state) => state);
  const { removeItem } = useActions();

  return (
    <>
      <div>
        <Link legacyBehavior href={'/'}>
          <a>Вернуться к покупкам</a>
        </Link>
      </div>
      {cart.length ? (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <Image src={product.image} alt={product.title} height={140} width={140} />
              <h2>Название: {product.title}</h2>
              <h2>Цена: {product.price * 70} </h2>
              <button onClick={() => removeItem({ id: product.id })}>Удалить</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>Ваша корзина пустая</div>
      )}
    </>
  );
}
