/**
 * * Usage:
 * import { namedLink, routes } from './lib/sharedLinks';
 *
 * * Instead of: link("/newsletter/dashboard")
 * namedLink('dashboard')
 *
 * * Instead of: link("/newsletter/:id", { id: "123" })
 * namedLink('detail', { id: "123" })
 *
 * * Instead of: link("/newsletter/subscribers/:id", { id: "456" })
 * namedLink('subscriberDetail', { id: "456" })
 */

import { defineLinks } from "rwsdk/router";

const HOME_ROUTE = { home: "/" };

// Define your route mappings with meaningful names
const TESTIMONIAL_ROUTES = {
  dashboard: "/admin/testimonials",
  form: "/testimonials/form",
  testimonials: "/admin/testimonials/all",
  settings: "/admin/testimonials/settings",
  new: "/admin/testimonials/new",
  edit: "/admin/testimonials/edit",
} as const;

const AUTH_ROUTES = {
  login: "/user/login",
  logout: "/user/logout",
} as const;

export const routes = {
  ...HOME_ROUTE,
  ...TESTIMONIAL_ROUTES,
  ...AUTH_ROUTES,
};

// Create the typed link function with all your routes
const linkGenerator = defineLinks([...Object.values(routes)]);

// Create a named link function that maps names to routes
export function namedLink(name: keyof typeof routes, params?: any): string {
  const route = routes[name];
  return linkGenerator(route as any, params);
}

// Export both the original link function and route mappings for flexibility
export const link = linkGenerator;

// Type helper to get all available route names
export type RouteNames = keyof typeof routes;
