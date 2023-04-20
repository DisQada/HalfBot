# [2.0.0-beta.1](https://github.com/DisQada/halfbot/compare/v1.0.0...v2.0.0-beta.1) (2023-04-20)


### Code Refactoring

* **info:** rework botinfo and delete botvars ([b706690](https://github.com/DisQada/halfbot/commit/b7066900179913f20af23e74baf800a8a24f0de7))
* **style:** make botstyle non-optional property ([b99bff4](https://github.com/DisQada/halfbot/commit/b99bff476f6710e19b6454223fae161d9dbe429b))


### BREAKING CHANGES

* **info:** botvars is no longer avilable, and botinfo works in a different way
* **style:** botstyle must be provided, else the bot won't work properly

# [1.0.0](https://github.com/DisQada/halfbot/compare/v0.2.1...v1.0.0) (2023-04-20)


### Build System

* replace 'paths-manager' with '@disqada/pathfinder' ([448243d](https://github.com/DisQada/halfbot/commit/448243df381b151ae9094a2daab9f334ec8e7575))


### Features

* **discordbot.ts:** improvements, refactors and new changes ([8bf690f](https://github.com/DisQada/halfbot/commit/8bf690fe00425b903015f74fd388e39d56feca26))


### BREAKING CHANGES

* paths-manager package is no longer a dependacy, use @disqada/pathfinder instead
