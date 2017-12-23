import { BaseEntity } from './../../shared';

export const enum TipoCV {
    'TUNEL',
    'ESTACION',
    'CABECERA'
}

export const enum Linea {
    'L1',
    'L2',
    'L3',
    'L4',
    'L5',
    'L6',
    'L7',
    'L7B',
    'L8',
    'L9',
    'TFM',
    'L10',
    'L10B',
    'L11',
    'L12',
    'RAMAL'
}

export const enum Accion {
    'OCUPA',
    'LIBERA'
}

export class Registro implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public hora?: any,
        public tipoCV?: TipoCV,
        public linea?: Linea,
        public nombreCV?: string,
        public chapa?: string,
        public accion?: Accion,
    ) {
    }
}
