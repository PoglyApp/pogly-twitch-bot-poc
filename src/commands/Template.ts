import { ChatUserstate } from "tmi.js";
import Command from "../utility/CommandType";

/*

This is a command template file. The bot does not register this as a command.
Either copy paste this code to your new command file or copy this entire file and 
rename "template" to whatever you want your command to be.

*/

const template: Command = {
  async execute(tags: ChatUserstate, args: string[]) {
    // Execute command code here
  },
};

export default template;
