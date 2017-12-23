import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Registro } from './registro.model';
import { RegistroPopupService } from './registro-popup.service';
import { RegistroService } from './registro.service';

@Component({
    selector: 'jhi-registro-delete-dialog',
    templateUrl: './registro-delete-dialog.component.html'
})
export class RegistroDeleteDialogComponent {

    registro: Registro;

    constructor(
        private registroService: RegistroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registroListModification',
                content: 'Deleted an registro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registro-delete-popup',
    template: ''
})
export class RegistroDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registroPopupService: RegistroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.registroPopupService
                .open(RegistroDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
