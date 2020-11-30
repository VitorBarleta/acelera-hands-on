import { Observable } from 'rxjs';
import { environment } from '@environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Entity } from '@common/seedwork/entity';
import { ID } from '@datorama/akita/lib/types';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

export class EntityService<TEntity extends Entity> {
    private readonly resourceUrl: string = `${environment.baseUrl}${this['resource']}`;

    constructor(
        protected httpclient: HttpClient,
        protected toastrService: ToastrService) { }

    protected get(id: ID): Observable<TEntity> {
        return this.httpclient
            .get<TEntity>(`${this.resourceUrl}/${id}`)
            .pipe(tap({ error: error => this.showError(error) }));
    }

    protected getAll(): Observable<TEntity[]> {
        return this.httpclient
            .get<TEntity[]>(this.resourceUrl)
            .pipe(tap({ error: error => this.showError(error) }));
    }

    protected create(entity: TEntity): Observable<TEntity> {
        return this.httpclient
            .post<TEntity>(this.resourceUrl, entity)
            .pipe(tap(() => this.showSuccess('created'), error => this.showError(error)));
    }

    protected put(entity: TEntity): Observable<TEntity> {
        return this.httpclient
            .put<TEntity>(`${this.resourceUrl}/${entity.id}`, entity)
            .pipe(tap(() => this.showSuccess('updated'), error => this.showError(error)));
    }

    protected delete(entity: TEntity): Observable<unknown> {
        return this.httpclient
            .delete(`${this.resourceUrl}/${entity.id}`)
            .pipe(tap(() => this.showSuccess('deleted'), error => this.showError(error)));
    }

    protected deleteById(id: ID): Observable<unknown> {
        return this.httpclient
            .delete(`${this.resourceUrl}/${id}`)
            .pipe(tap(() => this.showSuccess('deleted'), error => this.showError(error)));
    }

    private showSuccess(action: 'created' | 'updated' | 'deleted'): void {
        this.toastrService?.success(`Successfully ${action}`, 'Success');
    }

    private showError(error: HttpErrorResponse): void {
        this.toastrService?.error(`${error.statusText}`, 'Error');
    }
}