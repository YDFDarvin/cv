import {definitions} from "../public/cv.json"
import { classBeming } from "react-classnaming"
import type { ClassNamesProperty } from "react-classnaming"
import type { CssIdentifiersMap } from "../styles/index.scss"
import { forIn } from "../utils/assoc"
import { stacker } from "../utils/props"
import type { CVArticle, Term } from "../types"

//TODO De-hardcode - update data
const terms = {...definitions.stack, ...definitions.subjects}

type Props = Pick<CVArticle<string>, "stack"|"subjects"|"items"|"locations"|"description">

export {
  ArticleContent
}

function ArticleContent({
  stack,
  subjects,
  items,
  locations,
  description,
}: Props) {
  //TODO split css imports
  const bem = classBeming<ClassNamesProperty<CssIdentifiersMap>>()

  return <>
    {
      (description || locations) && <div {...bem({article__description: true})}>
        { description }

        {
          locations?.map(({title, description, city}, i) => <div key={i} {...bem({location: true})}>
            {title && <span {...bem({location__title: true})}>{title}</span>  }
            {description && <span {...bem({location__description: true})}>{description}</span> }
            {city && <span {...bem({location__city: true})}>{city}</span> }
          </div>)
        }
      </div>
    }
    { forIn({stack, subjects, goals: items}, (key, value) => value &&
      <ul key={key} {...bem({[`article__${key}`]: true})}>{
        forIn(value, (k, v) => {
          //TODO De-hardcode - update data
          const term: Term|undefined = terms[v] ?? (key in definitions ? {group: v} : undefined)
          , {favor, group} = term ?? {}
          , {href, title} = typeof v === "string" ? {title: v, href: undefined} : v
          return <li key={k}
            {...term && bem({term: favor === -1 ? "deprecated" : true})}
            {...stacker(group)}
          >{
            !href
            ? title
            : <a {...{href}}>{title}</a>
          }</li>
        })
      }</ul>
    ) }
  </>
}
