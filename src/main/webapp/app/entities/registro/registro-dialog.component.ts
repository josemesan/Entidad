import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Registro } from './registro.model';
import { RegistroPopupService } from './registro-popup.service';
import { RegistroService } from './registro.service';

@Component({
    selector: 'jhi-registro-dialog',
    templateUrl: './registro-dialog.component.html'
})
export class RegistroDialogComponent implements OnInit {

    registro: Registro;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private registroService: RegistroService,
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
        if (this.registro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registroService.update(this.registro));
        } else {
            this.subscribeToSaveResponse(
                this.registroService.create(this.registro));
        }
    }

    private subscribeToSaveResponse(result: Observable<Registro>) {
        result.subscribe((res: Registro) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Registro) {
        this.eventManager.broadcast({ name: 'registroListModification', content: 'OK'});
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
    selector: 'jhi-registro-popup',
    template: ''
})
export class RegistroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registroPopupService: RegistroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.registroPopupService
                    .open(RegistroDialogComponent as Component, params['id']);
            } else {
                this.registroPopupService
                    .open(RegistroDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
