const { Logger } = require("../../src/core/logger");
const { BotCommandDeployment } = require("../../src/entities/command");
const { Modules, RecordStates } = require("../../src/helpers/data/enums");

const logger = new Logger();

const record1 = {
    name: "test1",
    state: RecordStates.Success,
    type: Modules.Commands,
    deployment: BotCommandDeployment.Global,
    message: "test message"
};

const record2 = {
    name: "test-2",
    state: RecordStates.Fail,
    type: Modules.Events,
    message: "another test message"
};

const record3 = {
    name: "test 3",
    state: RecordStates.Error
};

test("should create logger instance", () => {
    expect(logger).toBeInstanceOf(Logger);
});

test("should have empty log records", () => {
    expect(logger.count).toEqual(0);
});

test("should have filled log records", () => {
    logger.add(record1);
    expect(logger.count).toEqual(1);

    logger.add(record2);
    logger.add(record3);
    expect(logger.count).toEqual(3);
});

test("should call debug with no errors", () => {
    const nothing = Logger.debug(logger);
    expect(nothing).toEqual(undefined);
});
