import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { RouterStateUrl, State } from "./router.state";

const initialRouterState: RouterReducerState<RouterStateUrl> = {
    state: {
      url: '',
      queryParams: {},
      params: {}
    },
    navigationId: 0
  };

export function routeReducer(state: RouterReducerState<RouterStateUrl> = initialRouterState, action: any): RouterReducerState<RouterStateUrl> {
    return routerReducer(state, action);
  }
  
  export const routeReducers: ActionReducerMap<State> = {
    router: routerReducer,
  };