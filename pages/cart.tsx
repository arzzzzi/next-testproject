export {};
import Link from 'next/link';
import CartItem from '../components/CartItem';
import { MainLayout } from '../components/Layout';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RootState } from '../redux/store';

export default function CartPage() {
  const { items, totalPrice } = useTypedSelector((state: RootState) => state.cart);

  return (
    <MainLayout title="Cart">
      <div>
        <Link legacyBehavior href={'/'}>
          <a>Вернуться к покупкам</a>
        </Link>
      </div>
      {items.length ? (
        <div>
          <ul>
            {items.map((item: any) => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
          {/* <h1>Итого: {totalPrice} ₽</h1> */}
        </div>
      ) : (
        <div>Ваша корзина пустая</div>
      )}
    </MainLayout>
  );
}
