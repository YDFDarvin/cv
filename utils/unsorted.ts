import htmlEscapeEntries from "./htmlEscapes.json"

export type Dict<V = unknown, K extends PropertyKey = string> = {[k in K]: V}
export type FlatObject = Record<string|number, null|undefined|boolean|number|string>
export type Values<T extends Dict> = T[keyof T][]

const {values: $values} = Object
, {from: $from} = Array
, htmlEscapes = new Map(htmlEscapeEntries as [string, string][])
, htmlEscapeCatcher = new RegExp(`[${$from(htmlEscapes.keys()).join("")}]`, "g")

export {
  isFlatObject,
  unique,
  htmlEscape,
  htmlReplacement
}

function isFlatObject(source: Dict) :source is FlatObject {
  const values = $values(source)
  
  for (let i = values.length; i--;) {
    const value = values[i]
    if (typeof value === "object" && value !== null)
      return false
  }
    
  return true
}

function unique<T extends unknown[]>(source: T) :T[number][] {
  return $from(new Set(source))
}

function htmlEscape(source: string) {
  return source.replace(htmlEscapeCatcher, c => htmlEscapes.get(c) ?? c)
}

function htmlReplacement(source: string|undefined) {
  return source?.replace(" ", "_")
}