import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTER_DEFINITIONS } from '../constants/router-definitions';
import { ROUTE_ACLS } from '../constants/route-acls';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private toastrService: ToastrService,
        private authService: AuthService,
        // private internalStorage: InternalStorage
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkAuthorization(route, state);

    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkAuthorization(route, state);
    }

    checkAuthorization(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = this.authService.getUserRole();

        if (!this.authService.isAuthenticated()
            || !this.routeAndRoleBroker(role, state)
        ) {
            this.toastrService.error('You don\'t have permissions to access this section', 'Error');
            this.router.navigate([ROUTER_DEFINITIONS.home]);
            return false;
        }
        return true;
    }

    routeAndRoleBroker(role, route): boolean {
        const routeAndRoleMap = ROUTE_ACLS;
        const routeAndRoleToCheck = role + route.url;

        return routeAndRoleMap.get(routeAndRoleToCheck);
    }

}
