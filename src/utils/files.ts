import type { IProductItem } from '~/store/ProductItemStore';


interface FileProducts {
    products: IProductItem[];
    name: string,
}


export function getProductsFromFile(file: File): Promise<FileProducts> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            try {
                const fileText = reader.result;
                if (typeof fileText !== 'string') return;
                const fileJson: FileProducts = JSON.parse(fileText);

                resolve(fileJson);
            } catch (error) {
                reject(error);
            }
        });

        reader.readAsText(file);
    });
}

export function saveProductsToFile(name: string, products: IProductItem[]): void {
    const blob = new Blob([
        JSON.stringify({
            name,
            products,
        }),
    ]);
    const fileName = `Product List - ${name}.json`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
}
