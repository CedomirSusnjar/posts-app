'use client';

import type { Route } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const paths: Route[] = [
  { path: '/', name: 'Homepage' },
  { path: '/articles', name: 'Articles' },
  { path: '/favourite-articles', name: 'Favourites' },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className={`flex gap-6 p-6 w-[100%] text-center bg-primary fixed top-0 z-10 font-bold`}>
      {paths.map((route: Route) => {
        return (
          <Link
            key={route.path}
            className={`text-m text-white ${route.path === pathname ? 'underline' : ''}`}
            href={route.path}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
};
