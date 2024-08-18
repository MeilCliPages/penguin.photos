import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { siteTitle, siteDescription } from "../constant";
import favicon from "../images/favicon.jpg";

const faviconSizes = [192, 512];

export const GET: APIRoute = async () => {
    const icons = await Promise.all(
        faviconSizes.map(async (size) => {
            const image = await getImage({
                src: favicon,
                width: size,
                height: size,
                format: "png",
            });
            return {
                src: image.src,
                type: `image/${image.options.format}`,
                sizes: `${image.options.width}x${image.options.height}`,
            };
        }),
    );

    const manifest = {
        name: siteTitle,
        description: siteDescription,
        start_url: ".",
        display: "standalone",
        id: "penguin-photos",
        icons,
    };

    return new Response(JSON.stringify(manifest));
};
