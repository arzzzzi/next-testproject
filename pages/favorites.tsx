import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../components/Layout';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { dislikeItem } from '../redux/favorites/favorite.slice';

export default function FavoritesPage() {
  const { favorite } = useTypedSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <MainLayout title="Favorites">
      <div>
        <Link legacyBehavior href={'/'}>
          <a>Вернуться к покупкам</a>
        </Link>
      </div>
      {favorite.length ? (
        <ul>
          {favorite.map((product) => (
            <li key={product.id}>
              <Image src={product.image} alt={product.title} height={140} width={140} />
              <h2>Название: {product.title}</h2>
              <h2>Цена: {product.price * 70} </h2>
              <button onClick={() => dispatch(dislikeItem({ id: product.id }))}>
                Удалить из избранного
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>Вы ничего не добавили в избранное</div>
      )}
    </MainLayout>
  );
}
