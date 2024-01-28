import type { KeyOf, UnionToIntersection, ValueOf } from "./ts-swiss.types"

const {isArray: $isArray} = Array

export {
  forIn,
  arrayize
}

function forIn<T extends any[] | Record<string, any>, R>(
  source: T,
  cb: T extends any[]
  ? (key: number, value: T[number]) => R
  : (key: KeyOf<T>, value: ValueOf<T>) => R
) :R[] {
  const $return: R[] = []

  if ($isArray(source))
    for (let i = source.length; i--;)
      //@ts-expect-error
      $return[i] = cb(i, source[i])
  else
    for (const key in source) 
      //@ts-expect-error
      $return.push(cb(key, source[key]))

  return $return
}
//: T extends any[] ? T : T extends undefined ? T : [T]
function arrayize<T>(source: T) :
  UnionToIntersection<Extract<T, any[]>>
  | [UnionToIntersection<Extract<T, Record<string, any>>>]
{
  //@ts-expect-error
  return !source
  ? source
  : $isArray(source) ? source : [source]
}
