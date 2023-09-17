const Link = require("../../src/helpers/classes/link");

test("Link safe domains", async () => {
    const domains = await Link.getSafeDomains();
    expect(Array.isArray(domains)).toBeTruthy();
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
