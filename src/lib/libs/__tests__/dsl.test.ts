import { describe, it, expect } from "vitest"
import { createRoutes } from "../dsl"
import type { Route } from "../../types/route"
import { createElement } from "react"

const el = createElement("div")

describe("createRoutes", () => {
  it("should convert an index page route", () => {
    const routes: Route[] = [
      { type: "page", index: true, element: el },
    ]
    const result = createRoutes(routes)
    expect(result).toEqual([{ index: true, element: el }])
  })

  it("should convert a child page route with path", () => {
    const routes: Route[] = [
      { type: "page", index: false, path: "about", element: el },
    ]
    const result = createRoutes(routes)
    expect(result).toEqual([{ path: "about", element: el }])
  })

  it("should convert a layout with children", () => {
    const routes: Route[] = [
      {
        type: "layout",
        path: "dashboard",
        element: el,
        children: [
          { type: "page", index: true, element: el },
          { type: "page", index: false, path: "settings", element: el },
        ],
      },
    ]
    const result = createRoutes(routes)
    expect(result).toEqual([
      {
        path: "dashboard",
        element: el,
        children: [
          { index: true, element: el },
          { path: "settings", element: el },
        ],
      },
    ])
  })

  it("should convert a group with children", () => {
    const routes: Route[] = [
      {
        type: "group",
        path: "admin",
        children: [
          { type: "page", index: true, element: el },
          { type: "page", index: false, path: "users", element: el },
        ],
      },
    ]
    const result = createRoutes(routes)
    expect(result).toEqual([
      {
        path: "admin",
        children: [
          { index: true, element: el },
          { path: "users", element: el },
        ],
      },
    ])
  })

  it("should handle a layout without path", () => {
    const routes: Route[] = [
      {
        type: "layout",
        element: el,
        children: [
          { type: "page", index: true, element: el },
        ],
      },
    ]
    const result = createRoutes(routes)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty("element", el)
    expect(result[0]).toHaveProperty("children", [{ index: true, element: el }])
  })

  it("should handle a group without path", () => {
    const routes: Route[] = [
      {
        type: "group",
        children: [
          { type: "page", index: false, path: "contact", element: el },
        ],
      },
    ]
    const result = createRoutes(routes)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty("children", [{ path: "contact", element: el }])
  })

  it("should return an empty array for empty input", () => {
    const routes: Route[] = []
    const result = createRoutes(routes)
    expect(result).toEqual([])
  })

  it("should deeply nest layouts and groups", () => {
    const routes: Route[] = [
      {
        type: "layout",
        path: "app",
        element: el,
        children: [
          {
            type: "group",
            path: "org",
            children: [
              {
                type: "layout",
                path: "team",
                element: el,
                children: [
                  { type: "page", index: true, element: el },
                ],
              },
            ],
          },
        ],
      },
    ]
    const result = createRoutes(routes)
    expect(result).toHaveLength(1)
    const app = result[0]
    expect(app).toHaveProperty("path", "app")
    expect(app).toHaveProperty("element", el)
    expect(app.children).toHaveLength(1)

    const org = app.children![0]
    expect(org).toHaveProperty("path", "org")
    expect(org).not.toHaveProperty("element")

    const team = org.children![0]
    expect(team).toHaveProperty("path", "team")
    expect(team).toHaveProperty("element", el)
    expect(team.children).toHaveLength(1)
    expect(team.children![0]).toEqual({ index: true, element: el })
  })

  it("should handle mixed route types at the same level", () => {
    const routes: Route[] = [
      { type: "page", index: true, element: el },
      { type: "page", index: false, path: "login", element: el },
      {
        type: "layout",
        path: "dashboard",
        element: el,
        children: [
          { type: "page", index: true, element: el },
        ],
      },
      {
        type: "group",
        children: [
          { type: "page", index: false, path: "faq", element: el },
        ],
      },
    ]
    const result = createRoutes(routes)
    expect(result).toHaveLength(4)
    expect(result[0]).toEqual({ index: true, element: el })
    expect(result[1]).toEqual({ path: "login", element: el })
    expect(result[2]).toEqual({
      path: "dashboard",
      element: el,
      children: [{ index: true, element: el }],
    })
    expect(result[3]).toEqual({
      children: [{ path: "faq", element: el }],
    })
  })

  it("should not mutate the original routes", () => {
    const routes = [
      { type: "page" as const, index: false, path: "original", element: el },
    ] satisfies Route[]
    const originalType = routes[0].type
    const originalPath = routes[0].path
    const originalElement = routes[0].element
    createRoutes(routes)
    expect(routes).toHaveLength(1)
    expect(routes[0].type).toBe(originalType)
    expect(routes[0].path).toBe(originalPath)
    expect(routes[0].element).toBe(originalElement)
  })
})
