import { initReddio } from '../utils/config';
import { useEffect } from 'react';
// @ts-ignore
export default function Layout({ children }) {
  useEffect(() => {
    initReddio();
  });
  return (
    <>
      <main>{children}</main>
    </>
  );
}
