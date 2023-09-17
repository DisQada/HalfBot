const { table } = require("table");
const { BotCommandDeployment } = require("../entities/command");
const { Modules, RecordStates } = require("../helpers/data/enums");

function newArray(length) {
    const arr = Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = 0;
    }
    return arr;
}

function toNum(module) {
    switch (module) {
        case Modules.Commands:
            return 0;

        case Modules.Events:
            return 1;
    }

    return -1;
}

function toSymbol(state) {
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

function defaultConfig(header) {
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

function fixRecord(record) {
    record.state = `${toSymbol(record.state)} ${RecordStates[record.state]}`;

    if (typeof record.deployment === "number") {
        record.deployment = BotCommandDeployment[record.deployment];
    }

    return record;
}

function toArray(record) {
    return [
        record.name,
        record.state,
        record.type?.substring(0, record.type.length - 1) || "",
        record.deployment || "",
        record.message || ""
    ];
}

class Logger {
    records = [];

    constructor(records) {
        if (!records) {
            return;
        }

        this.records = records;
    }

    add(record) {
        this.records.push(record);
    }

    get count() {
        return this.records.length;
    }

    static debug(logger) {
        const data1 = [
            ["name", "state", "type", "deployment", "message"],
            ...logger.records.map((r) => toArray(fixRecord(r)))
        ];
        console.log(table(data1, defaultConfig("Bot modules registration")));
    }
}

module.exports = {
    newArray,
    toNum,
    toSymbol,
    defaultConfig,
    Logger
};
