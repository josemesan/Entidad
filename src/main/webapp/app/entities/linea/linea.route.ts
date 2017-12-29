import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LineaComponent } from './linea.component';
import { LineaDetailComponent } from './linea-detail.component';
import { LineaPopupComponent } from './linea-dialog.component';
import { LineaDeletePopupComponent } from './linea-delete-dialog.component';

export const lineaRoute: Routes = [
    {
        path: 'linea',
        component: LineaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.linea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'linea/:id',
        component: LineaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.linea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lineaPopupRoute: Routes = [
    {
        path: 'linea-new',
        component: LineaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.linea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea/:id/edit',
        component: LineaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.linea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea/:id/delete',
        component: LineaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entidadApp.linea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
