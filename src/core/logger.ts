import type { TableUserConfig } from "table";

import { table } from "table";
import { BotCommandDeployment } from "../entities/command";
import { Modules, RecordStates } from "../helpers/data/enums";

export function newArray(length: number): Array<number> {
    const arr: number[] = Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = 0;
    }
    return arr;
}

export function toNum(module: string): number {
    switch (module) {
        case Modules.Commands:
            return 0;

        case Modules.Events:
            return 1;
    }

    return -1;
}

export function toSymbol(state: RecordStates): string {
    switch (state) {
        case RecordStates.Success:
            return "🟩";

        case RecordStates.Fail:
            return "🟨";

        case RecordStates.Error:
            return "🟥";

        default:
            return "⬜";
    }
}

export function defaultConfig(header: string): TableUserConfig {
    return {
        header: {
            alignment: "center",
            content: header
        },
        columnDefault: {
            alignment: "center",
            verticalAlignment: "middle",
            wrapWord: false
        }
    };
}

function fixRecord(record: any): typeof record {
    record.state = `${toSymbol(record.state)} ${RecordStates[record.state]}`;

    if (typeof record.deployment === "number") {
        record.deployment = BotCommandDeployment[record.deployment];
    }

    return record;
}

function toArray(record: any): string[] {
    return [
        record.name,
        record.state,
        record.type?.substring(0, record.type.length - 1) || "",
        record.deployment || "",
        record.message || ""
    ];
}

export class Logger {
    private records: Record[] = [];

    constructor(records?: Record[]) {
        if (!records) {
            return;
        }

        this.records = records;
    }

    public add(record: Record): void {
        this.records.push(record);
    }

    public get count(): number {
        return this.records.length;
    }

    public static debug(logger: Logger) {
        const data1 = [
            ["name", "state", "type", "deployment", "message"],
            ...logger.records.map((r: any) => toArray(fixRecord(r)))
        ];
        console.log(table(data1, defaultConfig("Bot modules registration")));
    }
}

export interface Record {
    name: string;
    state: RecordStates;
    type?: Modules;
    deployment?: BotCommandDeployment;
    message?: string;
}
