import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'evergreen-ui';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './store/AppProvider';
import { AuthProvider } from './store/AuthProvider';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <ThemeProvider value={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
