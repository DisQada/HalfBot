const Modules = Object.freeze({
    Commands: "commands",
    Events: "events",
    Modals: "modals"
});

const RecordStates = Object.freeze({
    Success: 0,
    Fail: 1,
    Error: 2
});

module.exports = {
    Modules,
    RecordStates
};
