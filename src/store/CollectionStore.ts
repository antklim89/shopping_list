import { makeAutoObservable } from 'mobx';


export class CollectionStore {
    constructor() {

        makeAutoObservable(this, {}, { autoBind: true });
    }
}
