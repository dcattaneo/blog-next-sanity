import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation (to always get the new data)
  //Set to true: when  you are fetching from cache in most cases is good enough if you dont need real-time data, such as for block-posts or if you dont need to see the new submitted articles every minute.
  token,
});

if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}
