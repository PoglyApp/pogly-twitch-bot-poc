import { ChatUserstate } from "tmi.js";
import Elements from "../../module_bindings/elements";
import WidgetElement from "../../module_bindings/widget_element";
import UpdateElementStructReducer from "../../module_bindings/update_element_struct_reducer";
import ElementStruct from "../../module_bindings/element_struct";
import { Variable } from "../spacetimedb/onSpacetimeDBConnect";

let elementId:string = "10";
let arrayOfUsers: string[] = [];

export function getElementId() {
  return elementId;
};

export function clearArrayOfUsers() {
  while(arrayOfUsers.length > 0) {
    arrayOfUsers.pop();
  }
}

function onTwitchMessage(channel: string, tags: ChatUserstate, message: string) {

  if (message.startsWith("!")) {
    const commandArray = message.slice(1).split(" ");
    const command = commandArray[0];
    const eleId = commandArray[1];

    if (!command || !eleId) return;
    if (command !== "config") return;

    if (tags.username?.toLowerCase() !== process.env.TWITCH_CHANNEL?.toLowerCase()) return;

    elementId = eleId;
    console.log("Configured to elementId " + elementId);
  }

  if (message === "array"){
    console.log(arrayOfUsers);
  }
  if (message === "clear"){
    clearArrayOfUsers();
  }

  function addVote(num: number) {
    if(!tags.username) return;
    if(!elementId) return;

    var element = Elements.findById(parseInt(elementId));
    if(!element) return;

    if(arrayOfUsers && arrayOfUsers.includes(tags.username)) return;

    var struct = element.element.value as WidgetElement;
    if(struct.rawData === '') return;
    
    var parsedStruct = JSON.parse(struct.rawData);

    if(parsedStruct.variables.find((v: Variable) => v.variableName === "Active").variableValue === false) return;

    parsedStruct.variables.forEach((v: Variable) => {
      if(v.variableName === ("Value " + num)) {
        v.variableValue = (parseInt(v.variableValue) + 1).toString();
      }
    });

    struct.rawData = JSON.stringify(parsedStruct);

    UpdateElementStructReducer.call(parseInt(elementId),ElementStruct.WidgetElement(struct));
    arrayOfUsers.push(tags.username);
  }

  switch(message) {
    case "1":
      addVote(1);
      break;
    case "2":
      addVote(2);
      break;
    case "3":
      addVote(3);
      break;
      case "4":
      addVote(4);
      break;
      case "5":
      addVote(5);
      break;
  }
}

export default onTwitchMessage;
