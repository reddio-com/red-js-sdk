import { initReddio } from '../utils/config';
import { useEffect } from 'react';
import Header from './header';
// @ts-ignore
export default function Layout({ children }) {
  useEffect(() => {
    initReddio();
  });
  return (
    <>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
