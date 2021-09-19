import { AnimatePresence, m } from 'framer-motion';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';


const Drawer: FunctionComponent = ({ children }) => {
    const state = useLocalObservable(() => ({
        show: false,
        toggle() {
            this.show = !this.show;
        },
    }));

    return (
        <div className="Drawer">
            <button className="Drawer__open-button btn" type="button" onClick={() => state.toggle()}>
                Open
            </button>
            <AnimatePresence>
                {state.show && (
                    <m.div
                        animate={{ opacity: 1 }}
                        className="Drawer__backdrop"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        role="none"
                        tabIndex={-1}
                        onClick={() => state.toggle()}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {state.show && (
                    <m.div
                        animate={{ y: 0, x: 0 }}
                        className="Drawer__window"
                        exit={{ y: 0, x: '100vh' }}
                        initial={{ y: 0, x: '100vh' }}
                        transition={{ type: 'tween' }}
                    >
                        <div className="Drawer__close-button">
                            <button className="btn delete" type="button" onClick={() => state.toggle()}>
                                x
                            </button>
                        </div>
                        <div className="Drawer__content">
                            {children}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default observer(Drawer);
