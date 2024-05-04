import { classBeming } from "react-classnaming"
import type { ClassNamesProperty } from "react-classnaming"
import type { CssIdentifiersMap } from "../styles/index.scss"
import { forIn } from "../utils/assoc"
import { ArticleContent } from "./ArticleContent"
import { chapter, dataProps } from "../utils/props"
import { Link } from "./Link"
import { tCV } from "../types"

export default function CV({
  title,
  description,
  links,
  items,
  properties
}: tCV<string>) {
  const bem = classBeming<ClassNamesProperty<CssIdentifiersMap>>()

  return <>
    <header {...bem({header: true})}>
      <span {...bem({header__title: true})}>{title}</span>
      <span {...bem({header__description: true})}>{description}</span>
    </header>

    <main {...bem({cv: true})}>
      <aside {...bem({cv__links: true})}>{
        forIn(links, (key, linksGroup) => <div key={key} {...bem({links_group: true})}>{
          forIn(linksGroup, (type, value) =>
            //TODO move to Link
            type === "location"
            ? <span key={type} {...bem({link: type})}>{value}</span>
            : <Link key={type} {...{
              type,
              value,
              ...bem({
                link: type === "phex" ? "phone" : type
              })}
            }/>
          )
        }</div>)
      }</aside>

      <hr {...bem({cv__delimiter: true})}/>

      { forIn(items, (section, {title, ...article}) =>
        <article key={section} {...bem({[`cv__${section}`]: true, article: true})}>
          <a {...bem({cv__chapter: true})} {...chapter(section)}>{title}</a>
          <ArticleContent {...article}/>
        </article>
      )}

      { forIn(properties, (section, {title, items}) =>
        <section key={section} {...bem({[`cv__${section}`]: true, article: true})}>
          <a {...bem({cv__chapter: true})} {...chapter(section)}>{title}</a>

          { forIn(items, (key, {min, max = "present", title, href, ...article}) =>
            <article key={key} {...bem({article: true})}>
              <a
                {...bem({article__title: [href ? "external" : "anchor", min === undefined ? false : "range"]})}
                {...href ? {href} : chapter(key)}
                {...dataProps({min, max})
              }>{title}</a>
              
              <ArticleContent {...article}/>
            </article>
          )}
        </section>
      )}
    </main>
  </>
}
