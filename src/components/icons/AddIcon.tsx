import { FunctionComponent, h } from 'preact';


export const AddIcon: FunctionComponent = (props) => {
    return (
        <svg
            height="48" viewBox="0 0 48 48" width="48"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        ><path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z" />
        </svg>
    );
};
