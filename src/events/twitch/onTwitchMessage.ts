import { ChatUserstate } from "tmi.js";
import Layouts from "../../module_bindings/layouts.js";
import SetLayoutActiveReducer from "../../module_bindings/set_layout_active_reducer.js";

function onTwitchMessage(channel: string, tags: ChatUserstate, message: string) {
  if (!message.startsWith("!")) return;

  const commandArray = message.slice(1).split(" ");
  const command = commandArray[0];
  const layoutName = commandArray[1];

  if (!command || !layoutName) return;
  if (command !== "layout") return;

  const layoutQuery = Layouts.filterByName(layoutName);
  const layout = layoutQuery.next();

  if (!layout.value) return;

  SetLayoutActiveReducer.call(layout.value.id);
}

export default onTwitchMessage;
