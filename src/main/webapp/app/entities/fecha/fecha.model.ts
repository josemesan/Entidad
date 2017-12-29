import { BaseEntity } from './../../shared';

export class Fecha implements BaseEntity {
    constructor(
        public id?: number,
        public dia?: string,
        public hora?: string,
    ) {
    }
}
