import { FunctionComponent, h } from 'preact';

import AddProduct from './AddProduct';


const Header: FunctionComponent = () => {
    return (
        <div className="Header">
            <div className="Header__container">
                <div className="Header__logo">
                    SHOPPING LIST
                </div>
                <AddProduct />
            </div>
        </div>
    );
};

export default Header;
