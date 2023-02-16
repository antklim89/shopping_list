import { AnimatePresence, m } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';


interface Props {
    state: {
        show: boolean;
        toggle(): void;
    };
}

const Drawer: FunctionComponent<Props> = ({ children, state }) => {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (state.show && e.key === 'Escape') state.toggle();
        };
        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    }, []);

    return (
        <div className="Drawer">
            <AnimatePresence>
                {/* @ts-expect-error preact type error */}
                {state.show
                    ? (
                        <m.div
                            animate={{ opacity: 1 }}
                            className="Drawer__backdrop"
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            role="none"
                            tabIndex={-1}
                            onClick={() => state.toggle()}
                        />
                    )
                    : <div />}
            </AnimatePresence>
            <AnimatePresence>
                {/* @ts-expect-error preact type error */}
                {state.show
                    ? (
                        <m.div
                            animate={{ y: 0, x: 0 }}
                            className="Drawer__window"
                            exit={{ y: 0, x: '100vh' }}
                            initial={{ y: 0, x: '100vh' }}
                            transition={{ type: 'tween' }}
                        >
                            {/* @ts-expect-error preact type error */}
                            <>
                                <div className="Drawer__close-button">
                                    <button
                                        aria-label="Close drawer"
                                        className="btn delete"
                                        type="button"
                                        onClick={() => state.toggle()}
                                    >
                                        x
                                    </button>
                                </div>
                                <div className="Drawer__content">
                                    {children}
                                </div>
                            </>
                        </m.div>
                    )
                    : <div />}
            </AnimatePresence>
        </div>
    );
};

export default observer(Drawer);
