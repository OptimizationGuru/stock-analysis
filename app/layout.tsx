'use client';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="../public/favicon.ico" />
        <title>TrendingTrade</title>
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
