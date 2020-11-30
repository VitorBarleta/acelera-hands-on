import { Subject } from 'rxjs';
/**
 * 
 * @param constructor automatically receives the `class` this decorator is in.
 * 
 * @usageNotes
 * 
 * Automatically closes all the observables that has an`pipe(takeUntil(this.componentOnDestroy()))`
 * when the `OnDestroy` method is called.
 * 
 * @example
 * 
 * export class SomeComponent implements OnDestroy {
 *  private onComponentDestroy: () => Observable<unknown>;
 * 
 *  public get(): Observable<any> {
 *      return this.service.get().pipe(takeUntil(this.componentOnDestroy()))
 *  }
 * }
 * 
 * @usageNotes
 * 
 * The method `ngOnDestroy` must be declared in the component, however it can be empty.
 * 
 * @example 
 * 
 * export class SomeComponent implements OnDestroy {
 *  private onComponentDestroy: () => Observable<unknown>;
 * 
 *  public get(): Observable<any> {
 *      return this.service.get().pipe(takeUntil(this.componentOnDestroy()))
 *  }
 * 
 *  ngOnDestroy() { }
 * }
 */
export function TakeUntilDestroy(constructor: Function): void {
    const originalDestroy = constructor.prototype.ngOnDestroy;
    if (typeof originalDestroy !== 'function') {
        console.warn(`${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`);
    }
    constructor.prototype.componentDestroy = function (): object {
        this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
        return this._takeUntilDestroy$.asObservable();
    };
    constructor.prototype.ngOnDestroy = function (...args): void {
        if (typeof originalDestroy === 'function') {
            originalDestroy.apply(this, args);
        }
        if (this._takeUntilDestroy$) {
            this._takeUntilDestroy$.next();
            this._takeUntilDestroy$.complete();
        }
    };
}
