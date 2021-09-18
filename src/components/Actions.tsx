import { h, FunctionComponent } from 'preact';

import { useStore } from './StoreProvider';


const Actions: FunctionComponent = () => {
    const { toFile, fromFile } = useStore();

    return (
        <div className="Actions">
            <button
                className="Actions__action btn"
                type="button"
                onClick={() => toFile()}
            >
                Save to File
            </button>

            <label className="Actions__action btn" htmlFor="load-file">
                Load from file
            </label>
            <input
                accept="application/json"
                className="hidden"
                id="load-file"
                type="file"
                onInput={(e) => {
                    fromFile(e.currentTarget.files);
                    e.currentTarget.value = '';
                }}
            />
        </div>
    );
};

export default Actions;
