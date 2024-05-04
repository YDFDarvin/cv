import { ClassNamed } from "react-classnaming"
import { dataProps } from "../utils/props"
import { LinkTypes, Leaf } from "../types"

type LinkProps = ClassNamed & {
  type: string
  value: Leaf<string>
}

export {
  Link
}

function Link({className, type, value}: LinkProps) {
  const {children, ...props} = typeof value === "string"
  ? linkHelper(type, value)
  : {children: value.title, href: value.href}

  return <a {...{className, ...props}}>{children}</a>
}

function linkHelper(type: string, value: string) {
  switch (type as LinkTypes) {
    case "phex": return {
      href: `tel:${parseInt(value, 16)}`,
      ...dataProps({content: `+${parseInt(value, 16)}`})
    }
    case "email": return {
      href: `mailto:${value}`,
      children: value
    }
    case "linkedin": return {
      href: `https://linkedin.com/in/${value}/`,
      children: `linkedin.com/in/${value}`
    }
    case "github": return {
      href: `https://github.com/${value}`,
      children: `github.com/${value}`
    }

    default: return {
      href: value,
      children: `${type}: ${value}`
    }
  }  
}