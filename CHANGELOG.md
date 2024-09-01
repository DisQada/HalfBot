## [3.1.3](https://github.com/DisQada/HalfBot/compare/v3.1.2...v3.1.3) (2024-01-07)

### Bug Fixes

- **DiscordBot:** Pass event args without modifications ([69e0832](https://github.com/DisQada/HalfBot/commit/69e08329fe62a8342258799bf26b63657a4f89d6))

## [3.1.2](https://github.com/DisQada/HalfBot/compare/v3.1.1...v3.1.2) (2024-01-02)

### Bug Fixes

- Eliminate types issues ([3ed25fb](https://github.com/DisQada/HalfBot/commit/3ed25fba4174950553c4d21d3a6393c4eeb66f30))

## [3.1.1](https://github.com/DisQada/HalfBot/compare/v3.1.0...v3.1.1) (2024-01-02)

### Bug Fixes

- Eliminate types issues ([202084c](https://github.com/DisQada/HalfBot/commit/202084c35a9b7bd825c564934e5c77038f90dce8))

# [3.1.0](https://github.com/DisQada/HalfBot/compare/v3.0.0...v3.1.0) (2024-01-01)

### Bug Fixes

- **BotOptions:** Identify 'client' prop as optional ([f57c47e](https://github.com/DisQada/HalfBot/commit/f57c47e866d8f6e18cc6618763cd20964a657854))

### Features

- **BotEvent:** Use 'once' property ([51f235c](https://github.com/DisQada/HalfBot/commit/51f235c5e685de086d084cea7f83f465d4db2dca))
- **BotEvet:** Introduce repeating events ([f4920a9](https://github.com/DisQada/HalfBot/commit/f4920a9943e9cde9ef82e88d668e593ad673aaca))

### Performance Improvements

- Speed up start time ([a544612](https://github.com/DisQada/HalfBot/commit/a5446129db6e669cfc443973a241ee23bb805e25))

# [3.0.0](https://github.com/DisQada/HalfBot/compare/v2.1.1...v3.0.0) (2023-12-30)

### Bug Fixes

- Use correct type ([d6358ec](https://github.com/DisQada/HalfBot/commit/d6358ecf1ec11a6496e5f4ebbe405936d6cea517))

### Code Refactoring

- Delete "emojiChars.json" ([99deb8f](https://github.com/DisQada/HalfBot/commit/99deb8ff69776b36658ef668aa1bdf9b96fad0b1))
- Delete "url.js" ([ba3de3e](https://github.com/DisQada/HalfBot/commit/ba3de3eeb216999a225b6ce37187f059290b5ab4))
- Replace bot module classes ([8d7f19c](https://github.com/DisQada/HalfBot/commit/8d7f19c39037a162f3897b44a952f3d7d4bd34f4))

### BREAKING CHANGES

- the array variable "emojiChars" has been deleted and no longer exists
- the function "isSafe" has been deleted and no longer exists
- BotCommand class and BotEvent class has been deleted and no longer exist, normal JS objects shall now be used instead

## [2.1.1](https://github.com/DisQada/HalfBot/compare/v2.1.0...v2.1.1) (2023-10-05)

### Bug Fixes

- **Logger:** Deployment value in records ([66c6538](https://github.com/DisQada/HalfBot/commit/66c6538aa0c15ef026a8fd133534268c1353bff9))

# [2.1.0](https://github.com/DisQada/halfbot/compare/v2.0.0...v2.1.0) (2023-09-30)

### Bug Fixes

- **discordbot:** keep DiscordBotData default values ([62a9553](https://github.com/DisQada/halfbot/commit/62a955353e5dac4d01753589755d2abed6e29025))

### Features

- Use data.module to define type ([4d102b1](https://github.com/DisQada/halfbot/commit/4d102b122ee307527ff7930a201dcaec2f0ab34f))

# [2.0.0](https://github.com/DisQada/halfbot/compare/v1.1.3...v2.0.0) (2023-09-25)

### Bug Fixes

- **discordbot:** use the correct function ([ab6c18c](https://github.com/DisQada/halfbot/commit/ab6c18cd74d854141ae35015d6a1ab0e5463d265))
- **logger:** include deployment in bot logs ([c72b02a](https://github.com/DisQada/halfbot/commit/c72b02affe8e13909469a4ae0d546843d90b410f))
- **style:** remove this ([d63b83f](https://github.com/DisQada/halfbot/commit/d63b83fcc09b0d38e599c801ef23c0efe2247694))

### Build System

- **@disqada/pathfinder:** upgrade to the next major version ([c17a5c0](https://github.com/DisQada/halfbot/commit/c17a5c0385e3c58404f7c8c0c68c88b9148f5dd8))
- **dotenv:** removed dependancy ([046f979](https://github.com/DisQada/halfbot/commit/046f9796515d919c5769950547de7833b142a891))

### Code Refactoring

- **botinfo:** change object structure ([5c8ba7d](https://github.com/DisQada/halfbot/commit/5c8ba7d4df15cee075e7220c500c027e7c86f33b))
- **botinfo:** rename BotInfo to BotConfig ([3600d8c](https://github.com/DisQada/halfbot/commit/3600d8c709c83944c0f6c2a72a9d10e8202d56db))
- **botinfo:** replace BotInfo class with object ([929ed6d](https://github.com/DisQada/halfbot/commit/929ed6d14e120f1941f1568c20428c7c72029d40))
- **botstyle:** replace BotStyle class with functions ([1b13403](https://github.com/DisQada/halfbot/commit/1b13403155fcd230242c3c12510bc0572a4d3eb9))
- **BotVars:** replace BotVars calss with object ([c3f2f9d](https://github.com/DisQada/halfbot/commit/c3f2f9da9fccae9c04d19a892802dffeca09bb50))
- **importer:** delete Importer ([0170bc3](https://github.com/DisQada/halfbot/commit/0170bc3368bcddba7ac95819becb8239e459d209))
- **style:** merge 3 functions into one ([7df1bbb](https://github.com/DisQada/halfbot/commit/7df1bbbbb20d123dd80b6056d9775c76d856454a))
- **vars:** delete DiscordBot.vars ([820ac39](https://github.com/DisQada/halfbot/commit/820ac39f311d0e1ff1490e026cf4fd3076fe518d))

### Features

- **asembed:** export textToEmbed as asEmbed ([5a011f5](https://github.com/DisQada/halfbot/commit/5a011f57c1ce0439a488f4ce2b9aeab29f7a52b9))
- **colour:** replace Colour class with functions ([9b7e1a5](https://github.com/DisQada/halfbot/commit/9b7e1a510bb672438240fbb7f81987185a92b6bd))
- **command.data:** add ability to skip defer or ephemeral it ([e418204](https://github.com/DisQada/halfbot/commit/e4182044c4160de0d318d94d5555e44b853aa894))
- **data/:** inject all JSON files inside data folder ([7ca46d5](https://github.com/DisQada/halfbot/commit/7ca46d53b731ab1b98d5904f5366e04f141d0bbf))
- replace Link class with functions ([f224e5c](https://github.com/DisQada/halfbot/commit/f224e5c6657aefbda2fc7074bff86333c1efcfc0))

### BREAKING CHANGES

- **@disqada/pathfinder:** @disqada/pathfinder upgraded to it's next major version
- **dotenv:** dotenv is no longer a dependency
- **data/:** Property config of DiscordBot class has been moved inside data property
- **botinfo:** Property info inside DiscordBot class is renamed to config
- **vars:** vars property inside DiscordBot class is deleted
- **style:** applyTo, applyToEmbed and applyToEmbeds functions are replaced with applyStyle
  function
- **botstyle:** BotStyle class is deleted, the style property inside DiscordBot class is deleted
  and applyTo... embeds now require the brand object as a second parameter
- **botinfo:** BotInfo old properties are replaced with new ones
- **botinfo:** BotInfo class is deleted
- **BotVars:** BotVars class deleted
- **importer:** Importer class deleted
- **colour:** The Colour class doesn't exist anymore
- Link class doesn't exist anymore

## [1.1.3](https://github.com/DisQada/halfbot/compare/v1.1.2...v1.1.3) (2023-05-03)

### Bug Fixes

- **logger:** fix not logging valid modules ([cfe0f7c](https://github.com/DisQada/halfbot/commit/cfe0f7c171e2c14fe97664dfff817c1543ae59fe))

## [1.1.2](https://github.com/DisQada/halfbot/compare/v1.1.1...v1.1.2) (2023-04-29)

### Bug Fixes

- **discordbot:** better module path checking ([c475a4a](https://github.com/DisQada/halfbot/commit/c475a4ab3c8b1bfd73295cefc83a207dbd54c168))
- **interactioncreate:** replying if not deffered ([792b718](https://github.com/DisQada/halfbot/commit/792b718c038f9b6e7e7246ad229458121192c103))

## [1.1.1](https://github.com/DisQada/halfbot/compare/v1.1.0...v1.1.1) (2023-04-24)

### Bug Fixes

- **import:** fix importing 'FilePath' from '@disqada/pathfinder' ([9aa4d9d](https://github.com/DisQada/halfbot/commit/9aa4d9d627a09d71447432bc4a6d17cd23e1b27b))

# [1.1.0](https://github.com/DisQada/halfbot/compare/v1.0.0...v1.1.0) (2023-04-23)

### Features

- **logger:** add Logger class and enums file ([455b52f](https://github.com/DisQada/halfbot/commit/455b52f341463ae0a840a764859d0efbc3d90dc9))
- **validation:** add new validation check system to botcommand and botevent classes ([d7c302d](https://github.com/DisQada/halfbot/commit/d7c302d538be176da0ba6053c598e9676c0f94d2))

# [1.0.0](https://github.com/DisQada/halfbot/compare/v0.2.1...v1.0.0) (2023-04-20)

### Build System

- replace 'paths-manager' with '@disqada/pathfinder' ([448243d](https://github.com/DisQada/halfbot/commit/448243df381b151ae9094a2daab9f334ec8e7575))

### Features

- **discordbot.ts:** improvements, refactors and new changes ([8bf690f](https://github.com/DisQada/halfbot/commit/8bf690fe00425b903015f74fd388e39d56feca26))

### BREAKING CHANGES

- paths-manager package is no longer a dependacy, use @disqada/pathfinder instead
