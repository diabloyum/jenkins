
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

    static handlers: { [key: string]: DetachedRouteHandle } = {};

    /**
     * function for deleting the snapshot
     */
    static deleteRouteSnapshot(path: string): void {
        const name = path.replace(/\//g, '_');
        if (CustomReuseStrategy.handlers[name]) {
            delete CustomReuseStrategy.handlers[name];
        }
    }

    /**
     * all routes are allowed to be reused
     * if you have routes that you don't want to take advantage
     * of you can add some business logic here
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    /**
     *  It fires when the route leaves.Store the route snapshot
     * & component's current instance object as the key by path
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        CustomReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
    }

    /**
     * If all of the paths in the cache agree to allow restore routing
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!CustomReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /**
     * Take a snapshot from the cache and return nul if not
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!CustomReuseStrategy.handlers[this.getRouteUrl(route)]) {
            return null;
        }

        return CustomReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /**
     * Enter route trigger to determine if it is the same route
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) === JSON.stringify(curr.params);
    }

    /**
     * make path as the key of the  route snapshot
     */
    getRouteUrl(route: ActivatedRouteSnapshot) {
        return route['_routerState'].url.replace(/\//g, '_');
    }

}
