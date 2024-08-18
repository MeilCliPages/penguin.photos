import { siteDescription } from "../constant";
import { ogp } from "../ogp";

export async function GET() {
    return ogp(siteDescription);
}
