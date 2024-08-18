import * as fs from "fs";
import * as path from "path";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import { siteUrl, siteTitle, siteAuthor } from "./constant";

const height = 630;
const width = 1200;

export async function ogp(title: string) {
    const faviconData = fs.readFileSync("src/images/favicon.jpg", "base64");

    const image = html`
        <div tw="flex w-full h-full bg-white">
            <p tw="absolute left-8 top-8 text-2xl">${siteTitle}</p>
            <h1 tw="w-full text-6xl text-center items-center justify-center px-16">${title}</h1>
            <img
                tw="absolute left-8 bottom-12 w-8 h-8 rounded-full border border-slate-300 border-solid"
                src="data:image/jpeg;base64,${faviconData}"
            />
            <p tw="absolute left-20 bottom-8 text-xl">${siteAuthor}</p>
            <p tw="absolute right-8 bottom-8 text-xl">${new URL(siteUrl).host}</p>
        </div>
    `;
    const fontBuffer = fs.readFileSync(
        path.join(process.cwd(), "node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-500-normal.woff"),
    ).buffer;
    const svg = await satori(image, {
        fonts: [{ name: "NotoSansJP", data: fontBuffer, style: "normal" }],
        height,
        width,
    });
    const buffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
    return new Response(buffer, {
        headers: { "Content-Type": "image/png" },
    });
}
