type DataSetter<T extends Record<string, unknown>> = {[k in `data-${Extract<keyof T,string>}`]: string}

export {
  dataProps,
  stacker,
  chapter
}

function dataProps<T extends Record<string, string|number>>(source: T) {
  const $return: Partial<DataSetter<T>> = {}

  for (const key in source) {
    const value = source[key]
    if (value === undefined)
      continue
    //@ts-expect-error
    $return[`data-${key}`]
    = typeof value === "string" ? value : `${value}`
  }
  
  return $return as DataSetter<T>
}

function stacker(id: string) {
  return dataProps({hover: id})
}

function chapter(id: string) {
  return { id, href: `#${id}` }
}
