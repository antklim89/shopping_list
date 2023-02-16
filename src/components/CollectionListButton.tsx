import { useLocalObservable } from 'mobx-react-lite';
import { FunctionComponent } from 'preact';

import CollectionList from './CollectionList';
import Drawer from './Drawer';
import { ListIcon } from './icons/ListIcon';


const CollectionListButton: FunctionComponent = () => {
    const state = useLocalObservable(() => ({
        show: false,
        toggle() {
            this.show = !this.show;
        },
    }));

    return (
        <>
            <button
                aria-hidden={!state.show}
                className="Drawer__open-button btn"
                type="button"
                onClick={() => state.toggle()}
            >
                <div className="sm-hide">Collections</div>
                <div className="lg-hide"><ListIcon /></div>
            </button>

            <Drawer state={state}>
                <CollectionList />
            </Drawer>
        </>
    );
};

export default CollectionListButton;
