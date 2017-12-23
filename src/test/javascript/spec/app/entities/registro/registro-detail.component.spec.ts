/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { EntidadTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RegistroDetailComponent } from '../../../../../../main/webapp/app/entities/registro/registro-detail.component';
import { RegistroService } from '../../../../../../main/webapp/app/entities/registro/registro.service';
import { Registro } from '../../../../../../main/webapp/app/entities/registro/registro.model';

describe('Component Tests', () => {

    describe('Registro Management Detail Component', () => {
        let comp: RegistroDetailComponent;
        let fixture: ComponentFixture<RegistroDetailComponent>;
        let service: RegistroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EntidadTestModule],
                declarations: [RegistroDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RegistroService,
                    JhiEventManager
                ]
            }).overrideTemplate(RegistroDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Registro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.registro).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
