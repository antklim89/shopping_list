import { FunctionComponent } from 'preact';

import {
    ClearIcon, CopyIcon, DoneAllIcon, LoadIcon, SaveIcon, ShareIcon,
} from './icons';
import { useStore } from './StoreProvider';

import { copyTextToClipboard } from '~/utils';


const Actions: FunctionComponent = () => {
    const { toFile, fromFile, clearProducts, toggleAllBougth } = useStore();

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
                    aria-label="Toggle all bought"
                    className="Actions__action btn"
                    type="button"
                    onClick={() => toggleAllBougth()}
                >
                    <div className="sm-hide">Toggle all bought</div>
                    <div className="lg-hide"><DoneAllIcon /></div>
                </button>
                <button
                    aria-label="Copy link"
                    className="Actions__action btn"
                    type="button"
                    onClick={() => copyTextToClipboard(location.href)}
                >
                    <div className="sm-hide">Copy link</div>
                    <div className="lg-hide"><CopyIcon /></div>
                </button>
                <button
                    aria-label="Clear List"
                    className="Actions__action btn"
                    type="button"
                    onClick={() => clearProducts()}
                >
                    <div className="sm-hide">Clear List</div>
                    <div className="lg-hide"><ClearIcon /></div>

                </button>
            </div>
            <div className="Actions__group">
                {(typeof window !== 'undefined' && window.navigator.share)
                    ? (
                        <button
                            aria-label="Share"
                            className="Actions__action btn"
                            type="button"
                            onClick={() => share()}
                        >
                            <div className="sm-hide">Share</div>
                            <div className="lg-hide"><ShareIcon /></div>
                        </button>
                    )
                    : null}
                <button
                    aria-label="Save to File"
                    className="Actions__action btn"
                    type="button"
                    onClick={() => toFile()}
                >
                    <div className="sm-hide">Save to File</div>
                    <div className="lg-hide"><SaveIcon /></div>
                </button>

                <label htmlFor="load-file">
                    <span
                        aria-controls="filename"
                        aria-label="Load from file"
                        className="Actions__action btn"
                        role="button"
                        tabIndex={0}
                    >
                        <div className="sm-hide">Load from file</div>
                        <div className="lg-hide"><LoadIcon /></div>
                    </span>
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
                </label>
            </div>
        </div>
    );
};

export default Actions;
