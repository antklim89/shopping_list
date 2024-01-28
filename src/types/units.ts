

export const Unit = {
    kg: 'kg',
    mg: 'mg',
    gram: 'gram',
    liter: 'liter',
    ml: 'ml',
    piece: 'piece',
};

export type Unit = typeof Unit[keyof typeof Unit]
