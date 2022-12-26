import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PrdouctItem from '../components/ProductItem';
import { IProduct } from '../models';
import { useGetProductsQuery } from '../redux/products/product.api';
import styles from '../styles/Index.module.scss';

// interface Props {
//   data: IProduct[];
// }

export default function Home() {
  const { data } = useGetProductsQuery(10);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.menu}>
          <Link legacyBehavior href={'/cart'}>
            <a>Корзина</a>
          </Link>
          <Link legacyBehavior href={'/favorites'}>
            <a>Избранное</a>
          </Link>
          <Link legacyBehavior href={'/'}>
            <a>Товары</a>
          </Link>
        </div>
      </header>
      <main className="maga">
        <div className={styles.products}>
          {data &&
            data.map((product: IProduct) => <PrdouctItem product={product} key={product.id} />)}
        </div>
      </main>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch('https://fakestoreapi.com/products/category/electronics');
//   const data = await res.json();
//   console.log(data);

//   return {
//     props: {
//       data,
//     },
//   };
// };