export interface Item {
    id: string;
    name: string;
    image: string | null;
    categoryId: string;
    locationId: string;
    quantity: number;
    quantityPerPackaging: number | null;
    totalQuantityPerPackaging: number | null; // find a better way to handle this
    upc: string | null;
    expirationDate: string | null;
}

export interface DisposedItem extends Item {
    disposedDate: string;
}
