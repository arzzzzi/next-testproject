import Head from 'next/head';
import Link from 'next/link';

interface IProps {
  children: React.ReactNode;
  title: string;
}

export function MainLayout({ children, title = 'Next App' }: IProps) {
  return (
    <>
      <Head>
        <title>{title} | Next JS </title>
        <meta name="keywords" content="next, javascript, nextjs, react" />
        <meta name="description" content="youtube next js courses" />
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link legacyBehavior href={'/'}>
          <a>Товары</a>
        </Link>
        <Link legacyBehavior href={'/cart'}>
          <a>Корзина</a>
        </Link>
        <Link legacyBehavior href={'/favorites'}>
          <a>Избранное</a>
        </Link>
      </nav>
      <main>{children}</main>
      <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          right: 0;
          background: darkblue;
          top: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 10;
        }
        nav a {
          color: white;
          text-decoration: none;
        }

        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
