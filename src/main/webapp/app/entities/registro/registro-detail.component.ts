import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Registro } from './registro.model';
import { RegistroService } from './registro.service';

@Component({
    selector: 'jhi-registro-detail',
    templateUrl: './registro-detail.component.html'
})
export class RegistroDetailComponent implements OnInit, OnDestroy {

    registro: Registro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registroService: RegistroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegistros();
    }

    load(id) {
        this.registroService.find(id).subscribe((registro) => {
            this.registro = registro;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegistros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registroListModification',
            (response) => this.load(this.registro.id)
        );
    }
}
