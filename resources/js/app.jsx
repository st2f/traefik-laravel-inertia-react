import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Type-in';

createInertiaApp({
  //title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    //root.render(<App {...props} />);
    root.render(<StrictMode><App {...props} /></StrictMode>);
  },
  progress: {
    color: '#4B5563',
  },
});
