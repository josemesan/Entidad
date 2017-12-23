import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Registro } from './registro.model';
import { RegistroService } from './registro.service';

@Injectable()
export class RegistroPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private registroService: RegistroService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.registroService.find(id).subscribe((registro) => {
                    registro.fecha = this.datePipe
                        .transform(registro.fecha, 'yyyy-MM-ddTHH:mm:ss');
                    registro.hora = this.datePipe
                        .transform(registro.hora, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.registroModalRef(component, registro);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.registroModalRef(component, new Registro());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    registroModalRef(component: Component, registro: Registro): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registro = registro;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
