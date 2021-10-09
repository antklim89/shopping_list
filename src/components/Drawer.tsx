import { AnimatePresence, m } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { FunctionComponent, h } from 'preact';


interface Props {
    state: {
        show: boolean;
        toggle(): void;
    };
}

const Drawer: FunctionComponent<Props> = ({ children, state }) => {
    return (
        <div className="Drawer">
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
