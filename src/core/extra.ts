import { ApplicationCommandType } from "discord.js";

export enum Modules {
	Commands = "commands",
	Events = "events",
	Modals = "modals"
}
export type Data = { name: string; type?: ApplicationCommandType } & any;
export type Info = {
	data: Data;
	execute: Function;
};

const requiredProperties1 = ["name"];
const requiredProperties2 = ["name", "description"];

export function isValid(data: Data, module: Modules): boolean {
	function yes(properties: string[]) {
		return properties.every((p: string) => p in data);
	}

	if (data?.name === "test") return true;

	const isNotChatInput = data?.type !== ApplicationCommandType.ChatInput;

	if (module === Modules.Commands && !isNotChatInput) {
		return yes(requiredProperties2);
	} else {
		return yes(requiredProperties1);
	}
}

export function logInvalid(filePath: string, info: Info): void {
	console.log(`Invalid module at path: "${filePath}, info:"`, info);
}

export function checkData(
	info: Info,
	module: Modules,
	filePath: string,
	callback: Function
) {
	if (info.data && isValid(info.data, module)) {
		callback(info);
	} else {
		logInvalid(filePath, info);
	}
}
