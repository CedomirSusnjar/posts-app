import { ReactNode } from 'react';
import './global.css';
import { AppProvider } from '@/context/AppContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children} {/* Renders the content of each page */}
        </AppProvider>
      </body>
    </html>
  );
}
