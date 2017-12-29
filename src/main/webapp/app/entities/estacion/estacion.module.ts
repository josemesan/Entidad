import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntidadSharedModule } from '../../shared';
import {
    EstacionService,
    EstacionPopupService,
    EstacionComponent,
    EstacionDetailComponent,
    EstacionDialogComponent,
    EstacionPopupComponent,
    EstacionDeletePopupComponent,
    EstacionDeleteDialogComponent,
    estacionRoute,
    estacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estacionRoute,
    ...estacionPopupRoute,
];

@NgModule({
    imports: [
        EntidadSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstacionComponent,
        EstacionDetailComponent,
        EstacionDialogComponent,
        EstacionDeleteDialogComponent,
        EstacionPopupComponent,
        EstacionDeletePopupComponent,
    ],
    entryComponents: [
        EstacionComponent,
        EstacionDialogComponent,
        EstacionPopupComponent,
        EstacionDeleteDialogComponent,
        EstacionDeletePopupComponent,
    ],
    providers: [
        EstacionService,
        EstacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntidadEstacionModule {}
