import { SpacetimeDBClient } from "@clockworklabs/spacetimedb-sdk";
import onSpacetimeDBConnect from "../spacetimedb/onSpacetimeDBConnect.js";
import onSpacetimeDBError from "../spacetimedb/onSpacetimeDBError.js";
import fs from "fs";

async function onTwitchConnect() {
  console.log("Bot online");

  let token: string | undefined = undefined;

  try {
    token = fs.readFileSync("token.txt").toString();
  } catch (err) {}

  const spacetimeDBClient = new SpacetimeDBClient(process.env.POGLY_DOMAIN!, process.env.POGLY_MODULE!, token);

  spacetimeDBClient.connect();
  spacetimeDBClient.onConnect(onSpacetimeDBConnect);
  spacetimeDBClient.onError(onSpacetimeDBError);

  spacetimeDBClient.subscribe("SELECT * FROM Layouts");
}

export default onTwitchConnect;
