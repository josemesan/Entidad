import { BaseEntity } from './../../shared';

export class Linea implements BaseEntity {
    constructor(
        public id?: number,
        public numeroDeTrenes?: number,
    ) {
    }
}
