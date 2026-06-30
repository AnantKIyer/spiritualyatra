import {
  fetchMutation as convexFetchMutation,
  fetchQuery as convexFetchQuery,
} from "convex/nextjs";
import type {
  FunctionReference,
  FunctionReturnType,
  OptionalRestArgs,
} from "convex/server";
import { requireConvexUrl } from "./url";

type ConvexFetchOptions = {
  url?: string;
  token?: string;
  adminToken?: string;
  skipConvexDeploymentUrlCheck?: boolean;
};

export async function fetchQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query> | [ConvexFetchOptions?]
): Promise<FunctionReturnType<Query>> {
  if (args.length === 0) {
    return convexFetchQuery(query, {}, { url: requireConvexUrl() });
  }

  const first = args[0];
  const looksLikeOptions =
    first !== null &&
    typeof first === "object" &&
    ("url" in first ||
      "token" in first ||
      "adminToken" in first ||
      "skipConvexDeploymentUrlCheck" in first);

  if (looksLikeOptions) {
    return convexFetchQuery(query, {}, {
      ...(first as ConvexFetchOptions),
      url: requireConvexUrl(),
    });
  }

  const [fnArgs, options] = args as [Query["_args"], ConvexFetchOptions?];
  return convexFetchQuery(query, fnArgs, {
    ...(options ?? {}),
    url: requireConvexUrl(),
  });
}

export async function fetchMutation<
  Mutation extends FunctionReference<"mutation">,
>(
  mutation: Mutation,
  ...args: OptionalRestArgs<Mutation> | [ConvexFetchOptions?]
): Promise<FunctionReturnType<Mutation>> {
  if (args.length === 0) {
    return convexFetchMutation(mutation, {}, { url: requireConvexUrl() });
  }

  const first = args[0];
  const looksLikeOptions =
    first !== null &&
    typeof first === "object" &&
    ("url" in first ||
      "token" in first ||
      "adminToken" in first ||
      "skipConvexDeploymentUrlCheck" in first);

  if (looksLikeOptions) {
    return convexFetchMutation(mutation, {}, {
      ...(first as ConvexFetchOptions),
      url: requireConvexUrl(),
    });
  }

  const [fnArgs, options] = args as [Mutation["_args"], ConvexFetchOptions?];
  return convexFetchMutation(mutation, fnArgs, {
    ...(options ?? {}),
    url: requireConvexUrl(),
  });
}
