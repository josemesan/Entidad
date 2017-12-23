import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroComponent } from './registro.component';
import { RegistroDetailComponent } from './registro-detail.component';
import { RegistroPopupComponent } from './registro-dialog.component';
import { RegistroDeletePopupComponent } from './registro-delete-dialog.component';

export const registroRoute: Routes = [
    {
        path: 'registro',
        component: RegistroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registro/:id',
        component: RegistroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registroPopupRoute: Routes = [
    {
        path: 'registro-new',
        component: RegistroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registro/:id/edit',
        component: RegistroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registro/:id/delete',
        component: RegistroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
