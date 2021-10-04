import { v4 } from 'uuid';

import type { UUID } from '~/types';


export default function isUUID(id: string | null): id is UUID {
    if (!id) return false;
    return id.split('-').length === 5;
}
