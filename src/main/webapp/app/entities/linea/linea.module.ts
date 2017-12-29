import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntidadSharedModule } from '../../shared';
import {
    LineaService,
    LineaPopupService,
    LineaComponent,
    LineaDetailComponent,
    LineaDialogComponent,
    LineaPopupComponent,
    LineaDeletePopupComponent,
    LineaDeleteDialogComponent,
    lineaRoute,
    lineaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lineaRoute,
    ...lineaPopupRoute,
];

@NgModule({
    imports: [
        EntidadSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LineaComponent,
        LineaDetailComponent,
        LineaDialogComponent,
        LineaDeleteDialogComponent,
        LineaPopupComponent,
        LineaDeletePopupComponent,
    ],
    entryComponents: [
        LineaComponent,
        LineaDialogComponent,
        LineaPopupComponent,
        LineaDeleteDialogComponent,
        LineaDeletePopupComponent,
    ],
    providers: [
        LineaService,
        LineaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntidadLineaModule {}
