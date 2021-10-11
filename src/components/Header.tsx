import { FunctionComponent, h } from 'preact';

import AddProduct from './AddProduct';
import CollectionListButton from './CollectionListButton';


const Header: FunctionComponent = () => {
    return (
        <header className="Header">
            <div className="Header__container">
                <p className="Header__logo">
                    SHOPPING LIST
                </p>
                <div className="Header__grow" />
                <CollectionListButton />
                <AddProduct className="Header__add-product" />
            </div>
        </header>
    );
};

export default Header;
