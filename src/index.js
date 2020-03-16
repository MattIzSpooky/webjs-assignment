import './styles/main.scss';

import {Header} from './app/header';

let header = new Header();
(async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
    console.log(await resp.json());
    await header.getFirstHeading();
})();
