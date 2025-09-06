import DeleteElementReducer from "../module_bindings/delete_element_reducer";
import ElementData from "../module_bindings/element_data";
import ElementStruct from "../module_bindings/element_struct";
import Elements from "../module_bindings/elements";
import ImageElement from "../module_bindings/image_element";
import ImageElementData from "../module_bindings/image_element_data";
import Layouts from "../module_bindings/layouts";
import SetLayoutActiveReducer from "../module_bindings/set_layout_active_reducer";
import UpdateTextElementTextReducer from "../module_bindings/update_text_element_text_reducer";
import UpdateWidgetElementRawDataReducer from "../module_bindings/update_widget_element_raw_data_reducer";
import { insertElement } from "./InsertElementHelper";
import { updateElementStruct } from "./UpdateElementStruct";
import { updateElementTransform } from "./UpdateElementTransform";

/**
 * Helper class for using Pogly SpacetimeDB reducers.
 */
export default class StDBHelper {
  /**
   * Gets the current active layout.
   *
   * @returns `Layouts` type object.
   *
   * @example
   * ```ts
   * const stdb: StDBHelper = new StDBHelper();
   * const layout: Layouts = stdb.GetActiveLayout();
   * ```
   */
  public GetActiveLayout(): Layouts {
    return Layouts.filterByActive(true).next().value;
  }

  /**
   * Gets a layout by layout name.
   *
   * @param name - Name of the layout (CASE SENSITIVE)
   * @returns `Layouts` type object.
   *
   * @example
   * ```ts
   * // Gets the "Default" layout.
   * const stdb: StDBHelper = new StDBHelper();
   * const layout: Layouts = stdb.GetLayoutByName("Default");
   * ```
   */
  public GetLayoutByName(name: string): Layouts {
    return Layouts.filterByName(name).next().value;
  }

  /**
   * Gets an `Elements` row by element ID.
   *
   * @param elementID - ID of the element.
   * @returns `Elements` if found; otherwise `void`.
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const el = stdb.GetElementByID(1);
   * ```
   */
  public GetElementByID(elementID: number): Elements | void {
    const element: Elements = Elements.filterById(elementID).next().value;

    if (!element) return console.error(`[ERROR] Could not find element: ${elementID}`);
    return Elements.filterById(elementID).next().value;
  }

  /**
   * Gets the `ElementStruct` (the struct payload) for a given element ID.
   *
   * Logs an error and returns `void` if the element cannot be found.
   *
   * @param elementID - ID of the element.
   * @returns `ElementStruct` if found; otherwise `void`.
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const struct = stdb.GetElementStructByID(123);
   * if (struct) {
   *   // use struct.value...
   * }
   * ```
   */
  public GetElementStructByID(elementID: number): ElementStruct | void {
    const element: Elements | void = this.GetElementByID(elementID);

    if (!element) return console.error(`[ERROR] Could not find element: ${elementID}`);

    return element.element;
  }

  /**
   * Gets an `ElementData` row by element data ID.
   *
   * @param elementDataID - ID of the element data.
   * @returns `ElementData` type object.
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const data = stdb.GetElementDataByID(55);
   * ```
   */
  public GetElementDataByID(elementDataID: number): ElementData {
    return ElementData.filterById(elementDataID).next().value;
  }

  /**
   * Sets a layout active by name.
   *
   * ======== Required bot identity to be a moderator ========
   *
   * Logs an error if the layout cannot be found.
   *
   * @param name - Name of the layout (CASE SENSITIVE).
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * stdb.SetLayoutActiveByName("Default");
   * ```
   */
  public SetLayoutActiveByName(name: string): void {
    const layout: Layouts = Layouts.filterByName(name).next().value;

    if (!layout) return console.error(`[ERROR] Could not find Layout: "${name}"`);

    SetLayoutActiveReducer.call(layout.id);
  }

  /**
   * Spawns a new text element into the specified layout.
   *
   * @param text - The text content.
   * @param layout - Target layout to insert into.
   * @param size - Font size in px. Defaults to `72`.
   * @param color - Text color in hex. Defaults to `#FFFFFF`.
   * @param font - Font family. Defaults to `"Roboto"`.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const layout = stdb.GetActiveLayout();
   * stdb.SpawnText("Hello World", layout, 48, "#FF00FF", "Inter");
   * ```
   */
  public SpawnText(
    text: string,
    layout: Layouts,
    size: number = 72,
    color: string = "#FFFFFF",
    font: string = "Roboto"
  ): void {
    const textElement: ElementStruct = ElementStruct.TextElement({
      text: text,
      size: size,
      color: color,
      font: font,
      css: JSON.stringify({
        shadow: `0px 0px 0px #000000`,
        outline: `0px #000000`,
        custom: "",
      }),
    });

    insertElement(textElement, layout);
  }

  /**
   * Updates the text content of a text element by its element ID.
   *
   * @param elementID - The element ID to update.
   * @param newText - The new text value to set.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * stdb.EditTextByID(100, "Updated message");
   * ```
   */
  public EditTextByID(elementID: number, newText: string): void {
    UpdateTextElementTextReducer.call(elementID, newText);
  }

  /**
   * Spawns an image element using an existing `ElementData` row.
   *
   * Logs an error if the `ElementData` cannot be found.
   *
   * @param elementDataID - The ID of the image `ElementData`.
   * @param layout - Target layout to insert into.
   * @param width - Optional explicit width. Defaults to the data's width.
   * @param height - Optional explicit height. Defaults to the data's height.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const layout = stdb.GetActiveLayout();
   * stdb.SpawnImage(42, layout);           // uses dataWidth/dataHeight
   * stdb.SpawnImage(42, layout, 800, 600); // overrides size
   * ```
   */
  public SpawnImage(elementDataID: number, layout: Layouts, width?: number, height?: number): void {
    const elementData: ElementData = this.GetElementDataByID(elementDataID);

    if (!elementData) return console.error(`[ERROR] Could not find ElementData: ${elementDataID}`);

    const newElementStruct: ElementStruct.ImageElement = ElementStruct.ImageElement({
      imageElementData: ImageElementData.ElementDataId(elementData.id),
      width: width ? width : elementData.dataWidth,
      height: height ? height : elementData.dataHeight,
    });

    insertElement(newElementStruct, layout);
  }

  /**
   * Replaces the image data of an existing image element while preserving its size.
   *
   * ======== Required bot identity to be a moderator ========
   *
   * Logs an error if the element cannot be found or is not an image.
   *
   * @param elementID - The element ID of the image.
   * @param imageData - Raw image data (e.g., base64-encoded).
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * stdb.EditImageByID(300, "data:image/png;base64,iVBORw0KGgo...");
   * ```
   */
  public EditImageByID(elementID: number, imageData: string): void {
    const element: Elements | void = this.GetElementByID(elementID);

    if (!element) return console.error(`[ERROR] Could not find element: ${elementID}`);

    const newImageElementData: ImageElementData = { tag: "RawData", value: imageData };
    const imageElement = element.element.value as ImageElement;

    const newImageElement = ElementStruct.ImageElement({
      imageElementData: newImageElementData as ImageElementData,
      width: imageElement.width,
      height: imageElement.height,
    });

    updateElementStruct(elementID, newImageElement);
  }

  /**
   * Spawns a widget element using an existing `ElementData` row.
   *
   * Logs an error if the `ElementData` cannot be found.
   *
   * @param elementDataID - ID of the widget's `ElementData`.
   * @param layout - Target layout.
   * @param width - Optional explicit width; defaults to data width.
   * @param height - Optional explicit height; defaults to data height.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const layout = stdb.GetActiveLayout();
   * stdb.SpawnWidget(77, layout);
   * ```
   */
  public SpawnWidget(elementDataID: number, layout: Layouts, width?: number, height?: number): void {
    const elementData: ElementData = this.GetElementDataByID(elementDataID);

    if (!elementData) return console.error(`[ERROR] Could not find ElementData: ${elementDataID}`);

    insertElement(
      ElementStruct.WidgetElement({
        elementDataId: elementData.id,
        width: width ? width : elementData.dataWidth,
        height: height ? height : elementData.dataHeight,
        rawData: "",
      }),
      layout
    );
  }

  /**
   * Deletes an element by ID.
   *
   * Logs an error if the element cannot be found.
   *
   * @param elementID - ID of the element to delete.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * stdb.DeleteElementByID(500);
   * ```
   */
  public DeleteElementByID(elementID: number): void {
    const element: Elements | void = this.GetElementByID(elementID);

    if (!element) return console.error(`[ERROR] Could not find element: ${elementID}`);

    DeleteElementReducer.call(elementID);
  }

  /**
   * Replaces an element's struct with a new `ElementStruct`.
   *
   * Logs an error if the element cannot be found.
   *
   * @param elementID - The element ID to update.
   * @param struct - The new `ElementStruct` to store.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * const layout = stdb.GetActiveLayout();
   * stdb.SpawnText("temp", layout);
   * const element = stdb.GetElementByID(123);
   * stdb.UpdateElementStruct(123, ElementStruct.TextElement({ text: "new", size: 24, color: "#fff", font: "Inter", css: "{}" }));
   * ```
   */
  public UpdateElementStruct(elementID: number, struct: ElementStruct): void {
    const element: Elements | void = this.GetElementByID(elementID);

    if (!element) return console.error(`[ERROR] Could not find element: ${elementID}`);

    updateElementStruct(elementID, struct);
  }

  /**
   * Edits a single variable inside a widget element's `rawData` JSON.
   *
   * ======== Required bot identity to be a moderator ========
   *
   * If the widget has no `rawData`, the base schema is loaded from its `ElementData`.
   * Logs an error if the element struct cannot be found.
   *
   * @param elementID - The widget element ID.
   * @param variableName - The name of the variable to update.
   * @param variableValue - The new value for the variable.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb = new StDBHelper();
   * stdb.EditWidgetVariable(999, "title", "Welcome!");
   * ```
   */
  public EditWidgetVariable(elementID: number, variableName: string, variableValue: any): void {
    const struct: ElementStruct.WidgetElement = this.GetElementStructByID(elementID) as ElementStruct.WidgetElement;
    if (!struct) return console.error(`[ERROR] Could not find element struct: ${elementID}`);

    const rawData = struct.value.rawData;
    let parsedData;

    if (rawData === "") {
      const elementData: ElementData = this.GetElementDataByID(struct.value.elementDataId);
      parsedData = JSON.parse(elementData.data);
    } else {
      parsedData = JSON.parse(rawData);
    }

    const variable = parsedData.variables.find((v: any) => v.variableName === variableName);
    variable.variableValue = variableValue;

    UpdateWidgetElementRawDataReducer.call(elementID, JSON.stringify(parsedData));
  }

  /**
   * Moves an Element to a new position on the canvas.
   *
   * Logs an error if the element cannot be found.
   *
   * @param elementID - The widget element ID.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @returns `void`
   *
   * @example
   * ```ts
   * const stdb: StDBHelper = new StDBHelper();
   * stdb.MoveElementByID(1, 0, 0);
   * ```
   */
  public MoveElementByID(elementID: number, x: number, y: number) {
    const element: Elements | void = this.GetElementByID(elementID);

    if (!element) return console.error(`[ERROR] Could not find element: ${elementID}`);

    const newTransform: string = `translate(${x}px, ${y}px)`;
    updateElementTransform(elementID, newTransform);
  }
}
