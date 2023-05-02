import { expect, test } from "vitest";
import { Logger } from "../../src/core/logger";
import { RecordStates } from "../../src/helpers/data/enums";

const logger: Logger = new Logger();

const record1 = {
    name: "test1",
    state: RecordStates.Success,
    message: "test message"
};

const record2 = {
    name: "test-2",
    state: RecordStates.Fail,
    message: "another test message"
};

const record3 = {
    name: "test 3",
    state: RecordStates.Error
};

test("should create logger instance", () => {
    expect(logger instanceof Logger).toBe(true);
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
