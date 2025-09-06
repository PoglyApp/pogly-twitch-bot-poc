import { ChatUserstate } from "tmi.js";
import Command from "../../utility/CommandType.js";

const onTwitchMessage = (channel: string, tags: ChatUserstate, message: string, commands: any) => {
  if (!commands) return;

  if (!message.startsWith(process.env.COMMAND_PREFI!)) return;

  const commandName = message
    .substring(message.indexOf(process.env.COMMAND_PREFI!) + 1)
    .split(new RegExp(/\s+/))
    .shift();

  if (!commandName) return;

  const commandArguments = message.split(" ");
  commandArguments.shift();

  const command: Command | undefined = commands.get(commandName.toLowerCase());

  if (!command) return;

  command.execute(tags, commandArguments);
};

export default onTwitchMessage;
