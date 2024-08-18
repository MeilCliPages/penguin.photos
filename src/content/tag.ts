export function escapeTag(tag: string): string {
    return tag.replaceAll("#", "sharp");
}

export function unescapeTag(tag: string): string {
    return tag.replaceAll("sharp", "#");
}
