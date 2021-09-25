import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import CollectionItem from './CollectionItem';
import { useStore } from './StoreProvider';


const CollectionList: FunctionComponent = () => {
    const store = useStore();

    const [newListName, setNewListName] = useState('');

    const handleAdd = () => {
        if (newListName.length < 2) return;
        store.currentCollection.add(newListName);
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

            {store.currentCollection.storeNames.map((storeName) => (
                <CollectionItem key={storeName.split(':').pop()} storeName={storeName} />
            ))}
        </div>
    );
};

export default observer(CollectionList);
