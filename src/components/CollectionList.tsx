import { AnimatePresence } from 'framer-motion';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';

import CollectionItem from './CollectionItem';
import { useStore } from './StoreProvider';


const CollectionList: FunctionComponent = () => {
    const store = useStore();

    const state = useLocalObservable(() => ({
        newCollectionName: '',

        handleAdd() {
            if (this.newCollectionName.length < 2) return;
            store.createCollection(this.newCollectionName);
            this.newCollectionName = '';
        },

        handleSetName(e: h.JSX.TargetedEvent<HTMLInputElement, Event>) {
            this.newCollectionName = e.currentTarget.value;
        },
    }));

    return (
        <div className="CollectionList">
            <div className="CollectionList__add">
                <input
                    aria-label="Add new list"
                    className="CollectionList__add_input input"
                    id="add-list"
                    maxLength={18}
                    placeholder="Add new list"
                    type="text"
                    value={state.newCollectionName}
                    onChange={state.handleSetName}
                    onKeyDown={(e) => e.key === 'Enter' && state.handleAdd()}
                />
                <button className="btn" type="button" onClick={state.handleAdd}>Add</button>
            </div>

            <ul className="CollectionList__items">
                <AnimatePresence>
                    {/* @ts-expect-error preact type error */}
                    <>
                        {store.collections.map((collection) => (
                            <CollectionItem collection={collection} key={collection.id} />
                        ))}
                    </>
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default observer(CollectionList);
