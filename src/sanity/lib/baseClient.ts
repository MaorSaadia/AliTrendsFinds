// First, create a baseClient.ts file
// sanity/lib/baseClient.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const baseClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
