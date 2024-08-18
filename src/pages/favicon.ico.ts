import type { APIRoute } from "astro";
import sharp from "sharp";
import ico from "sharp-ico";
import path from "path";

const faviconPath = path.resolve("src/images/favicon.jpg");

export const GET: APIRoute = async () => {
    const buffer = await sharp(faviconPath).resize(32).toFormat("png").toBuffer();
    const icoBuffer = ico.encode([buffer]);

    return new Response(icoBuffer, {
        headers: { "Content-Type": "image/x-icon" },
    });
};
