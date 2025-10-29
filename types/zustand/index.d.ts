declare module 'zustand' {
  export type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void
  export type GetState<T> = () => T

  export interface StoreApi<T> {
    (): T
    getState: GetState<T>
    setState: SetState<T>
  }

  export function create<T>(creator: (set: SetState<T>, get: GetState<T>) => T): StoreApi<T>
}
