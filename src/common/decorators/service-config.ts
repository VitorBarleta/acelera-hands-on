/**
 * 
 * @param resource The API endpoint resource
 * @param params The rest params to replace in the uri
 * 
 * 
 * @usageNotes
 * When using the decorator `@ServiceConfig` you must define the API resource and you can provide as well
 * `path` parameters.
 * 
 * @example
 * 
 * Without `path` parameters
 * 
 * @ServiceConfig('resource')
 * export class ResourceService extends EntityService<Resource> {
 *  
 * }
 * 
 * With `path`  parameters
 * 
 * @ServiceConfig('resource/{1}/subresource/{2}', 1, 1)
 * export class ResourceService extends EntityService<Resource> {
 *  
 * }
 * 
 * 
 */
export function ServiceConfig(resource: string, ...params: Array<string | number>) {
    return (target: Function): void => {
        params?.forEach((value, index) => {
            resource = resource.replace(`{${index+1}}`, value as string);
        });
        Object.defineProperty(target.prototype.constructor.prototype, 'resource', { value: resource.toLowerCase() });
    }
}
