import {
  DefaultError,
  QueryKey,
  useQuery,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
  QueryFilters,
  Query,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { BeanBase, Cast, SymbolBeanFullName, Virtual } from 'zova';
import { DefinedInitialQueryOptions, UndefinedInitialQueryOptions } from '../common/types.js';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';
import { QueryMetaPersisterStorage } from '../types.js';

@Virtual()
export class BeanDataBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryDefinedReturnType<TData, TError>>;
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQuery(params) {
    params = { ...params };
    params.queryKey = this._forceQueryKeyPrefix(params.queryKey);
    params.persister = this._createPersister(params.meta?.persister, false);
    return this.ctx.meta.util.instanceScope(() => {
      const data = useQuery(params);
      window.setTimeout(() => {
        this.$queryClient.setQueryData(params.queryKey, 500);
        this.$persisterSave(params.queryKey);
      }, 2000);
      return data;
    });
  }

  $persisterSave(queryKey: QueryKey, sync?: boolean) {
    const query = this.$queryFind({ queryKey });
    if (!query) return;
    const prefix = this._getPersisterPrefix();
    const storageKey = `${prefix}-${query.queryHash}`;
    if (sync === true) return;
    // Persist if we have storage defined, we use timeout to get proper state to be persisted
    setTimeout(async () => {
      localStorage.setItem(
        storageKey,
        await JSON.stringify({
          state: query.state,
          queryKey: query.queryKey,
          queryHash: query.queryHash,
          buster: '',
        }),
      );
    }, 0);
  }

  $queryFind<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    filters: QueryFilters,
  ): Query<TQueryFnData, TError, TData> | undefined {
    filters = { ...filters };
    Cast(filters).queryKey = this._forceQueryKeyPrefix(Cast(filters).queryKey);
    return this.$queryClient.getQueryCache().find(filters as any);
  }

  private _createPersister(options, sync: boolean) {
    console.log('options:', options);
    return experimental_createPersister({
      storage: localStorage,
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
      prefix: `${this.app.config.env.appName}-query`,
      serialize: data => {
        return JSON.stringify(data);
      },
    });
  }

  private _getPersisterStorage(storage: QueryMetaPersisterStorage, sync: boolean) {
    storage = storage ?? (sync ? 'local' : 'db');
  }

  private _getPersisterPrefix() {
    return `${this.app.config.env.appName}-query`;
  }

  private _forceQueryKeyPrefix(queryKey: QueryKey): QueryKey {
    if (!queryKey) return queryKey;
    const prefix = queryKey[0];
    if (prefix && typeof prefix === 'string' && prefix.split('.').length === 3) return queryKey;
    return [this[SymbolBeanFullName]].concat(queryKey as any);
  }
}
