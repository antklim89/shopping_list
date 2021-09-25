import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { useStore } from './StoreProvider';

import type { CollectionName } from '~/types/CollectionName';


const CollectionItem: FunctionComponent<{storeName: CollectionName}> = ({ storeName }) => {
    const [, name, id] = storeName.split(':');

    const [isEdit, setIsEdit] = useState(false);
    // const [newName, setNewName] = useState(name);

    const store = useStore();

    // useEffect(() => {
    //     store.currentCollection.rename(storeName, newName);
    // }, [newName, storeName]);

    return (
        <div key={id}>
            {isEdit
                ? (
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => store.currentCollection.rename(storeName, e.currentTarget.value)}
                    />
                )
                : (
                    <button
                        className={`btn ${storeName === store.currentCollection.storeName ? 'delete' : ''}`}
                        type="button"
                        onClick={() => store.currentCollection.select(storeName)}
                    >
                        {name}
                    </button>
                )}
            <button
                className="btn"
                type="button"
                onClick={() => setIsEdit((prev) => !prev)}
            >
                Edit
            </button>
            {/* {store.collectionNames.length > 1 && (
                <button
                    className="btn"
                    type="button"
                    onClick={() => store.removeCollection(storeName)}
                >
                    Delete
                </button>
            )} */}
        </div>
    );
};

export default observer(CollectionItem);
