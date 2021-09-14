import { FunctionComponent, h } from 'preact';

import style from '../styles/Header.module.scss';

import AddProduct from './AddProduct';


const Header: FunctionComponent = () => {
    return (
        <div className={style.root}>
            <div className={style.headerContainer}>
                <div className={style.logo}>
                    SHOPPING LIST
                </div>
                <AddProduct />
            </div>
        </div>
    );
};

export default Header;
