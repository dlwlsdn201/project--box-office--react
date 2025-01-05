import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/root';
import { QueryClient, QueryClientProvider } from 'react-query';
import RootLayout from './common/Layout';
import { ThemeProvider } from 'styled-components';
import theme from './lib/deviceTheme';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RootLayout>
          <RouterProvider router={router} />
        </RootLayout>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen=s{false} /> */}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
