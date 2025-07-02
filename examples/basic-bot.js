const TagcordClient = require("../src/TagcordClient");

const bot = new TagcordClient({
  token: "YOUR_DISCORD_BOT_TOKEN",
  prefix: "!",
});

bot.command({
  name: "ping",
  code: "$ping",
});

bot.command({
  name: "whoami",
  code: "You are $username",
});

bot.login();
