import type { UUID } from '~/types';


export function isUUID(id: string | null): id is UUID {
    if (!id) return false;
    return id.split('-').length === 5;
}
