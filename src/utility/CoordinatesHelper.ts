import ElementStruct from "../module_bindings/element_struct";
import StDBHelper from "./StDBHelper";

/**
 * Helper class for calculating element coordinates on a 1920x1080 screen.
 *
 * Each method returns the `{ X, Y }` coordinates for placing an element
 * at a specific location on the screen, taking into account its width/height.
 *
 */
export default class CoordinatesHelper {
  /**
   * Gets coordinates for the **top-left** corner of the screen.
   *
   * @returns Coordinates `{ X: 0, Y: 0 }`
   */
  public TopLeft() {
    return { X: 0, Y: 0 };
  }

  /**
   * Gets coordinates for the **top-right** corner of the screen.
   *
   * @param elementID - The ID of the element to align.
   * @returns Coordinates `{ X, Y }`
   */
  public TopRight(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const x: number = 1920 - structValue.width;

    return { X: x, Y: 0 };
  }

  /**
   * Gets coordinates for the **bottom-left** corner of the screen.
   *
   * @param elementID - The ID of the element to align.
   * @returns Coordinates `{ X, Y }`
   */
  public BottomLeft(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const y: number = 1080 - structValue.height;

    return { X: 0, Y: y };
  }

  /**
   * Gets coordinates for the **bottom-right** corner of the screen.
   *
   * @param elementID - The ID of the element to align.
   * @returns Coordinates `{ X, Y }`
   */
  public BottomRight(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const x: number = 1920 - structValue.width;
    const y: number = 1080 - structValue.height;

    return { X: x, Y: y };
  }

  /**
   * Gets coordinates for the **top-middle** of the screen.
   *
   * @param elementID - The ID of the element to center horizontally.
   * @returns Coordinates `{ X, Y }`
   */
  public TopMiddle(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const x: number = (1920 - structValue.width) / 2;

    return { X: x, Y: 0 };
  }

  /**
   * Gets coordinates for the **bottom-middle** of the screen.
   *
   * @param elementID - The ID of the element to center horizontally.
   * @returns Coordinates `{ X, Y }`
   */
  public BottomMiddle(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const x: number = (1920 - structValue.width) / 2;
    const y: number = 1080 - structValue.height;

    return { X: x, Y: y };
  }

  /**
   * Gets coordinates for the **left-middle** of the screen.
   *
   * @param elementID - The ID of the element to center vertically.
   * @returns Coordinates `{ X, Y }`
   */
  public LeftMiddle(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const y: number = (1080 - structValue.height) / 2;

    return { X: 0, Y: y };
  }

  /**
   * Gets coordinates for the **right-middle** of the screen.
   *
   * @param elementID - The ID of the element to center vertically.
   * @returns Coordinates `{ X, Y }`
   */
  public RightMiddle(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const x: number = 1920 - structValue.width;
    const y: number = (1080 - structValue.height) / 2;

    return { X: x, Y: y };
  }

  /**
   * Gets coordinates for the **center of the screen**.
   *
   * @param elementID - The ID of the element to center horizontally and vertically.
   * @returns Coordinates `{ X, Y }`
   */
  public Center(elementID: number) {
    const stdb: StDBHelper = new StDBHelper();
    const element: ElementStruct | void = stdb.GetElementStructByID(elementID);
    if (!element) return console.error("[ERROR] Could not find element.");

    const structValue: any = element.value;
    const x: number = (1920 - structValue.width) / 2;
    const y: number = (1080 - structValue.height) / 2;

    return { X: x, Y: y };
  }
}
