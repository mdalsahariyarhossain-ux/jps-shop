import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { AuthProvider } from './context/AuthContext';

test('renders header text', () => {
  render(
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
  const linkElement = screen.getByText(/MyShop/i);
  expect(linkElement).toBeInTheDocument();
});
