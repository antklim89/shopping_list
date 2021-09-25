import { h, FunctionComponent } from 'preact';

import { useStore } from './StoreProvider';

import { copyTextToClipboard } from '~/utils';


const Actions: FunctionComponent = () => {
    const { toFile, fromFile, clearProducts: clearList, toggleAllBougth: toggleBougth } = useStore();

    const shareData = {
        title: 'Shopping List',
        url: location.href,
    };


    const share = async () => {
        if (!navigator.share) return;
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="Actions">
            <div className="Actions__group">
                <button
                    className="Actions__action btn"
                    type="button"
                    onClick={() => toggleBougth()}
                >
                    Toggle all bought
                </button>
                <button
                    className="Actions__action btn"
                    type="button"
                    onClick={() => copyTextToClipboard(location.href)}
                >
                    Copy link
                </button>
                <button
                    className="Actions__action btn"
                    type="button"
                    onClick={() => clearList()}
                >
                    Clear List
                </button>
            </div>
            <div className="Actions__group">
                {typeof window !== 'undefined' && window.navigator.share && (
                    <button
                        className="Actions__action btn"
                        type="button"
                        onClick={() => share()}
                    >
                        Share
                    </button>
                )}
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
        </div>
    );
};

export default Actions;
