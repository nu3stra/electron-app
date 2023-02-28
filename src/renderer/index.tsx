import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './components/App';
import i18n from './@types/i18n';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
