import "dotenv/config";

import * as tmi from "tmi.js";
import { SpacetimeDBClient } from "@clockworklabs/spacetimedb-sdk";
import onTwitchMessage from "./events/twitch/onTwitchMessage";
import onTwitchConnect from "./events/twitch/onTwitchConnect";
import UpdateGuestNicknameReducer from "./module_bindings/update_guest_nickname_reducer";
import AuthenticateReducer from "./module_bindings/authenticate_reducer.js";
import ConnectReducer from "./module_bindings/connect_reducer.js";
import UpdateElementStructReducer from "./module_bindings/update_element_struct_reducer";
import Elements from "./module_bindings/elements";
import UpdateElementTransformReducer from "./module_bindings/update_element_transform_reducer";
import PingHeartbeatReducer from "./module_bindings/ping_heartbeat_reducer";

if (
  !process.env.TWITCH_CHANNEL ||
  !process.env.BOT_GUEST_NAME ||
  !process.env.POGLY_DOMAIN ||
  !process.env.POGLY_MODULE ||
  !process.env.POGLY_MODULE
) {
  console.log("MISSING ENVIRONMENT VARIABLES!!");
  process.exit();
}

SpacetimeDBClient.registerTables(Elements);
SpacetimeDBClient.registerReducers(
  AuthenticateReducer,
  ConnectReducer,
  UpdateGuestNicknameReducer,
  UpdateElementStructReducer,
  UpdateElementTransformReducer,
  PingHeartbeatReducer
);

const twitchChannel: string = process.env.TWITCH_CHANNEL;

const twitchClient = tmi.Client({ channels: [twitchChannel] });

twitchClient.connect();
twitchClient.on("connected", onTwitchConnect);
twitchClient.on("message", onTwitchMessage);
