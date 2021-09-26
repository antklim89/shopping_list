import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { useStore } from './StoreProvider';


const Lists: FunctionComponent = () => {
    const store = useStore();

    const [newListName, setNewListName] = useState('');

    const handleAdd = () => {
        store.addList(newListName);
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

            {store.lists.map((list) => list.split(':')).map(([, name, id]) => (
                <div key={id}>
                    <button className="btn" type="button">{name}</button>
                    <button className="btn" type="button">Edit</button>
                </div>
            ))}
        </div>
    );
};

export default Lists;
