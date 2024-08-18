import * as fs from "fs";
import * as path from "path";
import { imageSize } from "image-size";

export interface Image {
    width: number;
    height: number;
}

export class ImageCache {
    private cache = new Map<string, Image>();
    private name = "image";

    constructor() {
        if (fs.existsSync(path.join(process.cwd(), "cache")) == false) {
            fs.mkdirSync(path.join(process.cwd(), "cache"));
        }
        if (fs.existsSync(path.join(process.cwd(), `cache/${this.name}`)) == false) {
            fs.mkdirSync(path.join(process.cwd(), `cache/${this.name}`));
        }
    }

    private filePath(url: string): string {
        return path.join(process.cwd(), `cache/${this.name}/${encodeURIComponent(url)}`);
    }

    private async load(url: string): Promise<Image | null> {
        const response = await fetch(url);
        const imageBody = (await response.body?.getReader().read())?.value;
        if (imageBody == undefined) {
            throw new Error("Failed to fetch image");
        }
        const { width, height } = imageSize(imageBody);
        if (width == undefined || height == undefined) {
            throw new Error("Failed to get image size");
        }
        return { width, height };
    }

    async get(url: string): Promise<Image | undefined | null> {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        const filePath = this.filePath(url);
        if (fs.existsSync(filePath)) {
            const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            return json as Image;
        }

        console.log(`Fetching ${url}`);
        const response = await this.load(url);
        if (response != null) {
            const save = JSON.stringify(response);
            fs.writeFileSync(filePath, save);
            this.cache.set(url, response);
        }
        return response;
    }
}
