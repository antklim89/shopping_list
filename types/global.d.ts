
declare module 'uuid' {
    import type { UUID } from '~/types';


    const classes: { v4: () => UUID };
    export = classes;
}
