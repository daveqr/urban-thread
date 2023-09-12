import { ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
        {
            keys: ['cart'],
            rehydrate: true
        }
    )(reducer);
}

export const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
