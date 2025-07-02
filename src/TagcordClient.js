const { Client, GatewayIntentBits } = require("discord.js");
const CommandHandler = require("./CommandHandler");

class TagcordClient {
  constructor({ token, prefix = "!" }) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.token = token;
    this.prefix = prefix;
    this.commands = new Map();

    const handler = new CommandHandler(this.commands, this.prefix);
    this.client.on("messageCreate", handler.handle.bind(handler));
  }

  command({ name, code }) {
    this.commands.set(name, { code });
  }

  login() {
    this.client.login(this.token);
  }
}

module.exports = TagcordClient;
