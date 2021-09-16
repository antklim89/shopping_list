
if (import.meta.hot) {
    import.meta.hot.accept();
}


import { render, h } from 'preact';

import App from './App';

import '~/styles/global.scss';


render(
    <App />,
    document.body,
);

