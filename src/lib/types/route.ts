import type { ReactElement } from "react"

type PageBase = {
  type: "page"
  element: ReactElement
}

type IndexPage = PageBase & {
  index: true
  path?: never
}

type ChildPage = PageBase & {
  index: false
  path: string
}

type Page = IndexPage | ChildPage

type Layout = {
  type: "layout"
  path?: string
  element: ReactElement
  children: Route[]
}

type Group = {
  type: "group"
  path?: string
  children: Route[]
}

type Route = Page | Layout | Group


export type { Route, Page, Layout, Group }
