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

// export let Modules;
// (function (Modules) {
//     Modules["Commands"] = "commands";
//     Modules["Events"] = "events";
//     Modules["Modals"] = "modals";
// })(Modules || (Modules = {}));

// export let RecordStates;
// (function (RecordStates) {
//     RecordStates[(RecordStates["Success"] = 0)] = "Success";
//     RecordStates[(RecordStates["Fail"] = 1)] = "Fail";
//     RecordStates[(RecordStates["Error"] = 2)] = "Error";
// })(RecordStates || (RecordStates = {}));
