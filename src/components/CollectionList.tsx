import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import CollectionItem from './CollectionItem';
import { useStore } from './StoreProvider';


const CollectionList: FunctionComponent = () => {
    const store = useStore();

    const [newCollectionName, setNewCollectionName] = useState('');

    const handleAdd = () => {
        if (newCollectionName.length < 2) return;
        store.createCollection(newCollectionName);
        setNewCollectionName('');
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
                    value={newCollectionName}
                    onInput={(e) => setNewCollectionName(e.currentTarget.value)}
                />
                <button className="btn" type="button" onClick={handleAdd}>Add</button>
            </div>

            {store.collections.map((collection) => (
                <CollectionItem collection={collection} key={collection.id} />
            ))}
        </div>
    );
};

export default observer(CollectionList);
