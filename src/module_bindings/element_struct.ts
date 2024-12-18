// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  SumTypeVariant,
  BuiltinType,
  AlgebraicValue,
} from "@clockworklabs/spacetimedb-sdk";
// @ts-ignore
import { TextElement as __TextElement } from "./text_element";
// @ts-ignore
import { ImageElement as __ImageElement } from "./image_element";
// @ts-ignore
import { WidgetElement as __WidgetElement } from "./widget_element";

export namespace ElementStruct {
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant("TextElement", __TextElement.getAlgebraicType()),
      new SumTypeVariant("ImageElement", __ImageElement.getAlgebraicType()),
      new SumTypeVariant("WidgetElement", __WidgetElement.getAlgebraicType()),
    ]);
  }

  export function serialize(value: ElementStruct): object {
    switch (value.tag) {
      case "TextElement":
        return { TextElement: __TextElement.serialize(value.value) };
      case "ImageElement":
        return { ImageElement: __ImageElement.serialize(value.value) };
      case "WidgetElement":
        return { WidgetElement: __WidgetElement.serialize(value.value) };
      default:
        throw "unreachable";
    }
  }

  export type TextElement = { tag: "TextElement"; value: __TextElement };
  export const TextElement = (value: __TextElement): TextElement => ({ tag: "TextElement", value });
  export type ImageElement = { tag: "ImageElement"; value: __ImageElement };
  export const ImageElement = (value: __ImageElement): ImageElement => ({ tag: "ImageElement", value });
  export type WidgetElement = { tag: "WidgetElement"; value: __WidgetElement };
  export const WidgetElement = (value: __WidgetElement): WidgetElement => ({ tag: "WidgetElement", value });

  export function fromValue(value: AlgebraicValue): ElementStruct {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return { tag: "TextElement", value: __TextElement.fromValue(sumValue.value) };
      case 1:
        return { tag: "ImageElement", value: __ImageElement.fromValue(sumValue.value) };
      case 2:
        return { tag: "WidgetElement", value: __WidgetElement.fromValue(sumValue.value) };
      default:
        throw "unreachable";
    }
  }
}

export type ElementStruct = ElementStruct.TextElement | ElementStruct.ImageElement | ElementStruct.WidgetElement;
export default ElementStruct;
