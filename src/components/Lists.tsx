import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { useStore } from './StoreProvider';


const Lists: FunctionComponent = () => {
    const store = useStore();

    const [newListName, setNewListName] = useState('');

    const handleAdd = () => {
        if (newListName.length < 2) return;
        store.addCollection(newListName);
        setNewListName('');
    };

    return (
        <div>
            <div>
                <label htmlFor="add-list">Add new list: </label>
                <br />
                <input
                    className="input"
                    id="add-list"
                    type="text"
                    value={newListName}
                    onInput={(e) => setNewListName(e.currentTarget.value)}
                />
                <button className="btn" type="button" onClick={handleAdd}>Add</button>
            </div>

            {store.collectionNames.map((collection) => {
                const [, name, id] = collection.split(':');

                return (
                    <div key={id}>
                        <button
                            className={`btn ${collection === store.currentCollection ? 'delete' : ''}`}
                            type="button"
                            onClick={() => store.selectCollection(collection)}
                        >
                            {name}
                        </button>
                        <button
                            className="btn"
                            type="button"
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
            })}
        </div>
    );
};

export default observer(Lists);
