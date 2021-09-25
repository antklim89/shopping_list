import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { useStore } from './StoreProvider';

import type { CollectionName } from '~/types/CollectionName';


const CollectionItem: FunctionComponent<{collection: CollectionName}> = ({ collection }) => {
    const [isEdit, setIsEdit] = useState(false);
    const store = useStore();
    const [, name, id] = collection.split(':');

    return (
        <div key={id}>
            {isEdit
                ? (
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => store.renameCollection(e.currentTarget.name)}
                    />
                )
                : (
                    <button
                        className={`btn ${collection === store.currentCollection ? 'delete' : ''}`}
                        type="button"
                        onClick={() => store.selectCollection(collection)}
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
            {store.collectionNames.length > 1 && (
                <button
                    className="btn"
                    type="button"
                    onClick={() => store.removeCollection(collection)}
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default observer(CollectionItem);
