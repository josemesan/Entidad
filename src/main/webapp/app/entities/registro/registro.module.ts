import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntidadSharedModule } from '../../shared';
import {
    RegistroService,
    RegistroPopupService,
    RegistroComponent,
    RegistroDetailComponent,
    RegistroDialogComponent,
    RegistroPopupComponent,
    RegistroDeletePopupComponent,
    RegistroDeleteDialogComponent,
    registroRoute,
    registroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...registroRoute,
    ...registroPopupRoute,
];

@NgModule({
    imports: [
        EntidadSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegistroComponent,
        RegistroDetailComponent,
        RegistroDialogComponent,
        RegistroDeleteDialogComponent,
        RegistroPopupComponent,
        RegistroDeletePopupComponent,
    ],
    entryComponents: [
        RegistroComponent,
        RegistroDialogComponent,
        RegistroPopupComponent,
        RegistroDeleteDialogComponent,
        RegistroDeletePopupComponent,
    ],
    providers: [
        RegistroService,
        RegistroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntidadRegistroModule {}
