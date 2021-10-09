import { useLocalObservable } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';

import AddProduct from './AddProduct';
import CollectionList from './CollectionList';
import Drawer from './Drawer';
import { ListIcon } from './icons/ListIcon';


const Header: FunctionComponent = () => {
    const state = useLocalObservable(() => ({
        show: false,
        toggle() {
            this.show = !this.show;
        },
    }));

    return (
        <div className="Header">
            <div className="Header__container">
                <div className="Header__logo">
                    SHOPPING LIST
                </div>
                <div className="Header__grow" />

                <button className="Drawer__open-button btn" type="button" onClick={() => state.toggle()}>
                    <div className="sm-hide">Collections</div>
                    <div className="lg-hide"><ListIcon /></div>
                </button>

                <AddProduct className="Header__add-product" />
            </div>
            <Drawer state={state}>
                <CollectionList />
            </Drawer>
        </div>
    );
};

export default Header;
