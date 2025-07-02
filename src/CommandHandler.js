const parseFunctions = require("./FunctionParser");

class CommandHandler {
  constructor(commands, prefix) {
    this.commands = commands;
    this.prefix = prefix;
  }

  async handle(message) {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return;

    const args = message.content.slice(this.prefix.length).trim().split(/\s+/);
    const name = args.shift().toLowerCase();

    const command = this.commands.get(name);
    if (!command) return;

    const response = await parseFunctions(command.code, message, args);
    if (response) {
      message.channel.send({ content: response });
    }
  }
}

module.exports = CommandHandler;
