/// Domain

export type LinkTypes = "email"|"phex"|"location"|"linkedin"|"github"|"skype"|"html"|"pdf"|"npm"

export type tCV<V> = {
  title: V
  description: V
  links: Record<string, P<LinkTypes, Leaf<V>>>

  items: Record<"objectives"|"competences"|"languages", CVArticle<V>>

  properties: Record<"experience"|"projects"|"education", {
    title: V
    items: Record<string, CVArticle<V>>
  }>

  definitions: Record<"subjects"|"stack", Record<string, Term>>
}

export type CVArticle<V> = {
  title: V
} & Partial<{
  description: V
  min: number
  max: number
  href: string
  locations: Array<{
    title: V
    city: V
  } & Partial<{
    description: V    
  }>>
  subjects: V[]
  stack: V[]
  items: Array<Leaf<V>>
}>

export type Leaf<V> = V | {
  title: V
  href: V
}

export type Term = Partial<{
  favor: number
  group: string
}>

/// Lang

export type Langed = string | {[L in Langs]?: string}

export type LangRec<T> = T extends any[] ? LangRec<T[number]>[]
: T extends {[k in Langs]?: string}
? string
: T extends AnyObject ? {[k in keyof T]: LangRec<T[k]>}
: T

export type Langs = "en"|"uk"|"he"|"ru"

/// ts-swiss

type AnyObject = Record<string, any>
/** Partial Record */
type P<K extends string, V> = {[k in K]?: V}
