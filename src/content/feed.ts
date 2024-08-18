import type { CollectionEntry } from "astro:content";

export function getDate(feed: CollectionEntry<"feed">): Date {
    const paths = feed.id.split("/");

    if (paths.length < 4) {
        throw new Error(`Invalid id: ${feed.id}`);
    }

    const year = paths[0];
    const month = paths[1];
    const day = paths[2];

    return new Date(`${year}-${month}-${day}`);
}
