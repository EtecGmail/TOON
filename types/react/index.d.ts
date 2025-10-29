declare module 'react' {
  export type ReactNode = any
  export type Key = string | number

  export interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): ReactNode
  }

  export function useState<S>(
    initialState: S | (() => S),
  ): [S, (value: S | ((previous: S) => S)) => void]
  export function useMemo<T>(factory: () => T, deps: unknown[]): T
}
