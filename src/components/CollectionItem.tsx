import { m } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Fragment, FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { DeleteIcon, DoneIcon, EditIcon } from './icons';
import { useStore } from './StoreProvider';

import type { CollectionStore } from '~/store/CollectionStore';


interface Props {
    collection: CollectionStore;
}

const CollectionItem: FunctionComponent<Props> = ({ collection }) => {
    const [isEdit, setIsEdit] = useState(false);
    const ref = useRef(document.createElement('input'));
    const store = useStore();

    const toggleIsEdit = () => {
        setIsEdit((prev) => !prev);
    };

    useEffect(() => {
        if (ref.current) ref.current.focus();
    }, [isEdit]);
    return (
        <m.li
            animate={{ x: 0, opacity: 1 }}
            className="CollectionItem"
            exit={{ x: '100vh', opacity: 0 }}
            initial={{ x: '100vh', opacity: 0 }}
        >
            {/* @ts-expect-error preact type error */}
            <>
                {isEdit
                    ? (
                        <input
                            className="CollectionItem__input input"
                            maxLength={18}
                            ref={ref}
                            type="text"
                            value={collection.name}
                            onBlur={() => setIsEdit(false)}
                            onChange={(e) => collection.rename(e.currentTarget.value)}
                        />
                    )
                    : (
                        <button
                            className={`btn CollectionItem__name-btn ${collection.id === store.currentCollection.id ? 'CollectionItem__select' : ''}`}
                            type="button"
                            onClick={() => collection.select()}
                        >
                            {collection.name}
                        </button>
                    )}
                <button
                    className="CollectionItem__btn btn"
                    type="button"
                    onClick={toggleIsEdit}
                >
                    {isEdit ? <DoneIcon /> : <EditIcon />}
                </button>
                {collection.canDelete
                    ? (
                        <button
                            className="CollectionItem__btn btn delete"
                            type="button"
                            onClick={() => collection.delete()}
                        >
                            <DeleteIcon />
                        </button>
                    )
                    : null}
            </>
        </m.li>
    );
};

export default observer(CollectionItem);
