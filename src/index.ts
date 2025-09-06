import "dotenv/config";

import * as tmi from "tmi.js";
import onTwitchMessage from "./events/twitch/onTwitchMessage";
import onTwitchConnect from "./events/twitch/onTwitchConnect";
import registerCommands from "./utility/RegisterCommands";
import InitializeSpacetimeDB from "./utility/InitializeSpacetimeDB";

InitializeSpacetimeDB();

(async () => {
  if (
    !process.env.TWITCH_CHANNEL ||
    !process.env.BOT_GUEST_NAME ||
    !process.env.POGLY_DOMAIN ||
    !process.env.POGLY_MODULE ||
    !process.env.POGLY_MODULE
  ) {
    console.error("MISSING ENVIRONMENT VARIABLES!!");
    process.exit();
  }

  const commands = await registerCommands();

  if (!commands) {
    console.error("NO COMMANDS TO REGISTER!!");
    process.exit();
  }

  const twitchChannel: string = process.env.TWITCH_CHANNEL;
  const twitchClient = tmi.Client({ channels: [twitchChannel] });

  twitchClient.connect();
  twitchClient.on("connected", onTwitchConnect);
  twitchClient.on("message", (channel: string, tags: tmi.ChatUserstate, message: string) =>
    onTwitchMessage(channel, tags, message, commands)
  );
})();
