import { FunctionComponent, h } from 'preact';

import AddProduct from './AddProduct';
import Drawer from './Drawer';
import Lists from './Lists';


const Header: FunctionComponent = () => {
    return (
        <div className="Header">
            <div className="Header__container">
                <div className="Header__logo">
                    SHOPPING LIST
                </div>
                <div className="Header__grow" />
                <Drawer>
                    <Lists />
                </Drawer>
                <AddProduct className="Header__add-product" />
            </div>
        </div>
    );
};

export default Header;
