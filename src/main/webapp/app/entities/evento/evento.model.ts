import { BaseEntity } from './../../shared';

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
    ) {
    }
}
