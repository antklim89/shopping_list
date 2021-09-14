import { render, h } from 'preact';

import App from './App';


render(
    <App />,
    document.body,
);


if (import.meta.hot) {
    import.meta.hot.accept();
}
