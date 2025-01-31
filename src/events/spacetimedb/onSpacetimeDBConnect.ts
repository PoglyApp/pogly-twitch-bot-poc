import { Identity, Address } from "@clockworklabs/spacetimedb-sdk";
import UpdateGuestNicknameReducer from "../../module_bindings/update_guest_nickname_reducer";
import AuthenticateReducer from "../../module_bindings/authenticate_reducer.js";
import ConnectReducer from "../../module_bindings/connect_reducer.js";
import fs from "fs";
import Elements from "../../module_bindings/elements";
import { clearArrayOfUsers, getElementId } from "../twitch/onTwitchMessage";
import WidgetElement from "../../module_bindings/widget_element";
import { StartHeartbeat } from "../../util/ping";

export interface Variable {
  variableName: string;
  variableType: number;
  variableValue: string;
}

async function onSpacetimeDBConnect(token: string, Identity: Identity, Address: Address) {
  console.log("Connected to SpacetimeDB! [" + Identity.toHexString() + "] @ [" + Address.toHexString() + "]");

  fs.writeFileSync("token.txt", token);

  ConnectReducer.call();
  AuthenticateReducer.call(process.env.POGLY_AUTHENTICATION_KEY!);
  UpdateGuestNicknameReducer.call(process.env.BOT_GUEST_NAME!);

  Elements.onUpdate((oldElement, newElement, reducerEvent) => {
    const elementId = getElementId();

    if (!elementId) return;
    if (newElement.id !== parseInt(elementId)) return;

    var newStruct = JSON.parse((newElement.element.value as WidgetElement).rawData);
    var newActive = newStruct.variables.find((v: Variable) => v.variableName === "Active");

    if(newActive.variableValue === false) clearArrayOfUsers();
  });

  StartHeartbeat();
}

export default onSpacetimeDBConnect;
