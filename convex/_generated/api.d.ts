/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as adminAuth from "../adminAuth.js";
import type * as adminDestinations from "../adminDestinations.js";
import type * as adminPackages from "../adminPackages.js";
import type * as adminTestimonials from "../adminTestimonials.js";
import type * as analytics from "../analytics.js";
import type * as contactInquiries from "../contactInquiries.js";
import type * as destinations from "../destinations.js";
import type * as files from "../files.js";
import type * as lib_adminAuth from "../lib/adminAuth.js";
import type * as lib_password from "../lib/password.js";
import type * as packageEvents from "../packageEvents.js";
import type * as packages from "../packages.js";
import type * as seed from "../seed.js";
import type * as testimonials from "../testimonials.js";
import type * as validators from "../validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  adminAuth: typeof adminAuth;
  adminDestinations: typeof adminDestinations;
  adminPackages: typeof adminPackages;
  adminTestimonials: typeof adminTestimonials;
  analytics: typeof analytics;
  contactInquiries: typeof contactInquiries;
  destinations: typeof destinations;
  files: typeof files;
  "lib/adminAuth": typeof lib_adminAuth;
  "lib/password": typeof lib_password;
  packageEvents: typeof packageEvents;
  packages: typeof packages;
  seed: typeof seed;
  testimonials: typeof testimonials;
  validators: typeof validators;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
