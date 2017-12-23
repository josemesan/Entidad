import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Registro } from './registro.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RegistroService {

    private resourceUrl = SERVER_API_URL + 'api/registros';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(registro: Registro): Observable<Registro> {
        const copy = this.convert(registro);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(registro: Registro): Observable<Registro> {
        const copy = this.convert(registro);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Registro> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Registro.
     */
    private convertItemFromServer(json: any): Registro {
        const entity: Registro = Object.assign(new Registro(), json);
        entity.fecha = this.dateUtils
            .convertDateTimeFromServer(json.fecha);
        entity.hora = this.dateUtils
            .convertDateTimeFromServer(json.hora);
        return entity;
    }

    /**
     * Convert a Registro to a JSON which can be sent to the server.
     */
    private convert(registro: Registro): Registro {
        const copy: Registro = Object.assign({}, registro);

        copy.fecha = this.dateUtils.toDate(registro.fecha);

        copy.hora = this.dateUtils.toDate(registro.hora);
        return copy;
    }
}
