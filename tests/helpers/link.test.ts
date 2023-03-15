import Link from "../../src/helpers/classes/link";
import { test, expect } from "vitest";

test("Link safe domains", async () => {
	const domains = await Link.getSafeDomains();
	expect(domains).to.be.an("array");
	expect(domains.length).toBeGreaterThan(1);
});

test("Link class initialising", () => {
	const url = "https://github.com";
	const link = new Link(url);
	expect(link.url).toEqual(url);
});

test("Link default avatar link/url", () => {
	expect(Link.defaultAvatarLink.url).toBe(Link.defaultAvatarUrl);
});
