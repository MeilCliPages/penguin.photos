import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteTitle, siteDescription, siteUrl } from "../constant";
import { getDate } from "../content/feed";

export const GET: APIRoute = async () => {
    const feeds = await getCollection("feed");
    return rss({
        title: siteTitle,
        description: siteDescription,
        site: siteUrl,
        items: feeds.map((feed) => ({
            ...feed.data,
            pubDate: getDate(feed),
            link: `/${feed.slug}/`,
        })),
    });
};
