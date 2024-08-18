import { defineCollection, z } from "astro:content";

const feed = defineCollection({
    type: "data",
    schema: z.object({
        tag: z.string(),
        images: z.array(z.string()),
    }),
});

export const collections = { feed };
