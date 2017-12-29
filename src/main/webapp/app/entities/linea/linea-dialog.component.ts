import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Linea } from './linea.model';
import { LineaPopupService } from './linea-popup.service';
import { LineaService } from './linea.service';

@Component({
    selector: 'jhi-linea-dialog',
    templateUrl: './linea-dialog.component.html'
})
export class LineaDialogComponent implements OnInit {

    linea: Linea;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lineaService: LineaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.linea.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lineaService.update(this.linea));
        } else {
            this.subscribeToSaveResponse(
                this.lineaService.create(this.linea));
        }
    }

    private subscribeToSaveResponse(result: Observable<Linea>) {
        result.subscribe((res: Linea) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Linea) {
        this.eventManager.broadcast({ name: 'lineaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-linea-popup',
    template: ''
})
export class LineaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaPopupService: LineaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lineaPopupService
                    .open(LineaDialogComponent as Component, params['id']);
            } else {
                this.lineaPopupService
                    .open(LineaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
