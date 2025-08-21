import { ChatUserstate } from "tmi.js";
import Layouts from "../../module_bindings/layouts.js";
import SetLayoutActiveReducer from "../../module_bindings/set_layout_active_reducer.js";
import ElementStruct from "../../module_bindings/element_struct.js";
import { WidgetElement } from "../../module_bindings/widget_element.js";
import Elements from "../../module_bindings/elements.js";
import UpdateElementStructReducer from "../../module_bindings/update_element_struct_reducer.js";

let Authenticated: string[] = ["fasshn", "akaoutlaw", "lethalchip"];

let CurrentTicketsID = 0;
let ItemCostID = 1;
let MoneySpentID = 2;

function AuthenticateUser(tags: ChatUserstate)
{
  const username = tags.username || tags['display-name'] || 'Unknown';
  return Authenticated.includes(username);
}

function onTwitchMessage(channel: string, tags: ChatUserstate, message: string) {
  if (!message.startsWith("!")) return;

  const commandArray = message.slice(1).split(" ");
  const command = commandArray[0];
  const AS = commandArray[1];
  if (!AuthenticateUser(tags))
  {
    return;
  }
  if (!command || !AS) return;
  if (command == "ct") 
  {
    CurrentTickets(channel, tags, message);
    return;
  }
  const layoutQuery = Layouts.filterByName(AS);
  const layout = layoutQuery.next();

  if (!layout.value) return;

  SetLayoutActiveReducer.call(layout.value.id);
}


function CurrentTickets(channel: string, tags: ChatUserstate, message: string)
{
  const username = tags.username || tags['display-name'] || 'Unknown';
  const commandArray = message.slice(1).split(" ");
  const ticketValue = commandArray[1];

  const elementId = 43;
  

    CurrentTicketsID = Number(ticketValue);
    console.log("Changing Current Tickets To:", CurrentTicketsID, "by user:", username);
    console.log("Would update element ID:", elementId);
  
    const CTdata = {
      "widgetName": "Current Points",
      "widgetWidth": 128,
      "widgetHeight": 128,
      "headerTag": "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Score Box</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap\" rel=\"stylesheet\">\n  <style>\n    body {\n      background: transparent; /* no header background */\n      font-family: 'Orbitron', monospace;\n      min-height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .points-container {\n      background: linear-gradient(145deg, #0f3460, #16537e);\n      border: 2px solid #ffd60a;\n      border-radius: 12px;\n      padding: 15px 25px;\n      text-align: center;\n      position: relative;\n      box-shadow: \n        0 0 20px rgba(238, 26, 35, 0.7),\n        inset 0 2px 4px rgba(0, 255, 0, 0.1);\n      overflow: hidden;\n    }\n\n    .points-container::before {\n      content: '';\n      position: absolute;\n      top: -50%;\n      left: -50%;\n      width: 200%;\n      height: 200%;\n      background: linear-gradient(\n        45deg,\n        transparent,\n        rgba(238, 26, 35, 0.3),\n        transparent\n      );\n      animation: shine 0.5s infinite;\n    }\n\n    .points-label {\n      font-size: 12px;\n      color: #FFFFFF;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n      margin-bottom: 5px;\n      font-weight: 900; /* heaviest Orbitron weight */\n      position: relative;\n      z-index: 2;\n      text-shadow:\n        0.75px 0 #FFFFFF,\n       -0.75px 0 #FFFFFF,\n        0.75 1px #FFFFFF,\n        0.75 -1px #FFFFFF; /* thickens the text visually */\n    }\n\n    .points-value {\n      font-size: 32px;\n      font-weight: 900;\n      color: #00ff41;\n      text-shadow: \n        0 0 5px #00ff41,\n        0 0 10px #00ff41,\n        0 0 15px #00ff41;\n      animation: glow 2s infinite;\n      position: relative;\n      z-index: 2;\n    }\n\n    @keyframes shine {\n      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }\n      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }\n    }\n\n  </style>\n</head>",
      "bodyTag": "<body>\n  <div class=\"points-container\">\n    <div class=\"points-label\">Current Tickets</div>\n    <div class=\"points-value\" id=\"currentScore\">{PO}</div>\n  </div>\n</body>",
      "styleTag": ".points-container::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  animation: shine 6s infinite; /* slower and more subtle */\n}\n\n.points-value {\n  font-size: 32px;\n  font-weight: 900;\n  color: #ee1a23;\n  animation: glow 2s infinite;\n  position: relative;\n  z-index: 2;\n}\n\n.points-container\n{\n  background: transparent;\n   border: 2px solid #ffffff;\n}\n\n\n\n@keyframes glow {\n  0%, 100% { text-shadow: 0 0 1px currentColor, 0 0 2px currentColor, 0 0 3px currentColor; }\n  50% { text-shadow: 0 0 1.5px currentColor, 0 0 3px currentColor, 0 0 4px currentColor; }\n}\n\n@keyframes shine {\n  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }\n  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }\n}",
      "scriptTag": "",
      "variables": [
        {
          "variableName": "PO",
          "variableType": 1,
          "variableValue": CurrentTicketsID.toString()
        }
      ]
    };

    const element = Elements.findById(elementId);
    if(!element) {
      console.log("Couldn't find the specified element!");
      return;
    }

    const widgetStruct: ElementStruct = element.element;
    (widgetStruct.value as WidgetElement).rawData = JSON.stringify(CTdata);
    UpdateElementStructReducer.call(elementId, widgetStruct);

}

export default onTwitchMessage;