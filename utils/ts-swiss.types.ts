/** @see https://stackoverflow.com/a/50375286/10325032 */
export type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void
? Intersection
: never;

/** @see https://stackoverflow.com/a/49579497/9412937 */
export type RequiredKeys<T> = { [K in keyof T]-?:
  ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T]

export type Recombine<T> = T extends any[]
? Recombine<T[number]>[]
: T extends Record<string, any>
? (
  {[K in keyof T]?: T[K]}
  // {[K in keyof UnionToIntersection<T>]?: Recombine<UnionToIntersection<T>[K]>}
)
: T

// type primitive = undefined | null | boolean | number | string | symbol | bigint

export type KeyOf<T> = keyof UnionToIntersection<T>

export type ValueOf<T> = UnionToIntersection<UnionToIntersection<T>[keyof UnionToIntersection<T>]>