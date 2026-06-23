import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-paper dark:bg-gray-950">
      <Header />
      <main className="flex-1 mx-auto w-full px-5 py-10 max-w-3xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
