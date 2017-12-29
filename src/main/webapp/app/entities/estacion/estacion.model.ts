import { BaseEntity } from './../../shared';

export class Estacion implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nemo?: string,
    ) {
    }
}
