import type { RouteObject } from "react-router-dom";
import type { Route } from "../types/route";


const createRoutes = (routes: Route[]): RouteObject[] => {
  return routes.map((route): RouteObject => {
    switch (route.type) {
      case "page":
        return route.index
          ? {
            index: true,
            element: route.element,
          }
          : {
            path: route.path,
            element: route.element,
          };

      case "layout":
        return {
          path: route.path,
          element: route.element,
          children: createRoutes(route.children),
        };

      case "group":
        return {
          path: route.path,
          children: createRoutes(route.children),
        };
    }
  });
}


export { createRoutes }
