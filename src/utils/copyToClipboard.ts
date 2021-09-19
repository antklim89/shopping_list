function fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (error) {
        console.error('Fallback: Oops, unable to copy', error);
    }

    document.body.removeChild(textArea);
}

export async function copyTextToClipboard(text: string): Promise<void> {
    if (!window.navigator?.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('Async: Could not copy text: ', error);
    }
}
