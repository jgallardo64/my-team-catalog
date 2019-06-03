import { ROUTER_DEFINITIONS } from './router-definitions';

export const ROUTE_ACLS: Map<string, boolean> = new Map([

    // --> Route: /admin
    ['CLIENT' + ROUTER_DEFINITIONS.admin, false],
    ['ADMIN' + ROUTER_DEFINITIONS.admin, true]
]);
