export default class Link {
	public static get defaultAvatarUrl(): string {
		return "https://cdn.discordapp.com/embed/avatars/0.png";
	}
	public static get defaultAvatarLink(): Link {
		return new Link(this.defaultAvatarUrl);
	}

	public static async getSafeDomains(): Promise<string[]> {
		const safeDomains = await import("../data/safeDomains");
		return safeDomains.default;
	}

	public url: string;

	constructor(url: string) {
		// TODO Check url validity
		this.url = url;
	}
}
