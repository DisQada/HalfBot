import table, { Formatter, Header } from "tty-table";
import { BotCommandDeployment } from "../entities/command";
import { RecordStates } from "../helpers/data/enums";

const header: Header[] = [
    {
        value: "name",
        align: "center",
        width: 15
    },
    {
        value: "state",
        align: "center",
        width: 15,
        formatter: function (value: RecordStates): string {
            const str = RecordStates[value];

            // return value === RecordStates.Success // @ts-expect-error
            //     ? this.style(str, "bgGreen")
            //     : value === RecordStates.Fail // @ts-expect-error
            //     ? this.style(str, "bgYellow") // @ts-expect-error
            //     : this.style(str, "bgRed");

            return value === RecordStates.Success
                ? `🟩 ${str}`
                : value === RecordStates.Fail
                ? `🟨 ${str}`
                : `🟥 ${str}`;
        }
    },
    {
        value: "deployment",
        align: "center",
        width: 15,
        formatter: function (value: BotCommandDeployment): string {
            return BotCommandDeployment[value];
        }
    },
    {
        value: "message",
        align: "center",
        width: 30
    }
];
const footer: (string | Formatter)[] = [
    "Registered commands",
    function (
        // @ts-expect-error
        cellValue: any, // @ts-expect-error
        columnIndex: number, // @ts-expect-error
        rowIndex: number,
        rowData: [string, RecordStates, BotCommandDeployment, string][]
    ) {
        // const total = rowData.reduce((previous, current) => {
        //     const successful = current[1] === RecordStates.Success;
        //     return previous + (successful ? 1 : 0);
        // }, 0);
        // return `${((total / rowData.length) * 100).toFixed(2)}%`;

        const length = Object.keys(RecordStates).length * 0.5;
        const numbers: number[] = Array.apply(null, Array(length)).map(() => 0);
        rowData.forEach((value) => {
            const state = value[1];
            numbers[state]++;
        });

        return numbers.join(" - ");
    },
    function (
        // @ts-expect-error
        cellValue: any, // @ts-expect-error
        columnIndex: number, // @ts-expect-error
        rowIndex: number,
        rowData: [string, RecordStates, BotCommandDeployment, string][]
    ) {
        const length = Object.keys(BotCommandDeployment).length * 0.5;
        const numbers: number[] = Array.apply(null, Array(length)).map(() => 0);
        rowData.forEach((value) => {
            const deployment = value[2];
            numbers[deployment]++;
        });

        return numbers.join(" - ");
    },
    " "
];

export class Logger {
    private records: Record[] = [];

    constructor(records?: Record[]) {
        if (!records) {
            return;
        }

        this.records = records;
    }

    public add(record: Record): void {
        if (!record.deployment) {
            record.deployment = BotCommandDeployment.Global;
        }

        if (!record.message) {
            record.message = "";
        }

        this.records.push(record);
    }

    public get count(): number {
        return this.records.length;
    }

    public static debug(logger: Logger) {
        const rows = [...logger.records];

        console.log(table(header, rows, footer).render());
    }
}

export interface Record {
    name: string;
    state: RecordStates;
    deployment?: BotCommandDeployment;
    message?: string;
}
