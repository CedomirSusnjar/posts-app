import { ReactNode } from 'react';
import './global.css';
import { AppProvider } from '@/context/AppContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A description of your site" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>My Next.js App</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppProvider>
          {children} {/* Renders the content of each page */}
        </AppProvider>
      </body>
    </html>
  );
}
