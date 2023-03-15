import { Modules, isValid } from "../../src/core/extra";
import { ApplicationCommandType } from "discord.js";
import { test, expect } from "vitest";

test("Checking the validity of a command", () => {
	expect(
		isValid(
			{
				name: "test",
				type: ApplicationCommandType.ChatInput
			},
			Modules.Commands
		)
	).toBeTruthy();

	expect(
		isValid(
			{
				name: "test",
				description: "test",
				type: ApplicationCommandType.ChatInput
			},
			Modules.Commands
		)
	).toBeTruthy();

	expect(
		isValid(
			{
				name: "not a test",
				type: ApplicationCommandType.ChatInput
			},
			Modules.Commands
		)
	).toBeFalsy();
});

test("Checking the validity of an event", () => {
	expect(isValid({ name: "test" }, Modules.Events)).toBeTruthy();
	expect(isValid({ name: "not a test" }, Modules.Events)).toBeTruthy();
});
