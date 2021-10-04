import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { useStore } from './StoreProvider';

import type { CollectionStore } from '~/store/CollectionStore';


const CollectionItem: FunctionComponent<{collection: CollectionStore}> = ({ collection }) => {
    const [isEdit, setIsEdit] = useState(false);

    const store = useStore();

    return (
        <div>
            {isEdit
                ? (
                    <input
                        className="input"
                        type="text"
                        value={collection.name}
                        onChange={(e) => collection.rename(e.currentTarget.value)}
                    />
                )
                : (
                    <button
                        className={`btn ${collection.id === store.currentCollection.id ? 'delete' : ''}`}
                        type="button"
                        onClick={() => collection.select()}
                    >
                        {collection.name}
                    </button>
                )}
            <button
                className="btn"
                type="button"
                onClick={() => setIsEdit((prev) => !prev)}
            >
                Edit
            </button>
            {collection.canDelete && (
                <button
                    className="btn"
                    type="button"
                    onClick={() => collection.delete()}
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default observer(CollectionItem);
