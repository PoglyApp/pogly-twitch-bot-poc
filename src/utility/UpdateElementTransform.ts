import UpdateElementTransformReducer from "../module_bindings/update_element_transform_reducer";
import { GetCoordsFromTransform, GetTransformFromCoords } from "./ConvertCoordinates";

export const updateElementTransform = (elementId: number, transform: string) => {
  const transformCoords = GetCoordsFromTransform(transform);
  const newTransform = GetTransformFromCoords(
    transformCoords.x,
    transformCoords.y,
    transformCoords.rotation,
    transformCoords.rotationAfterX,
    transformCoords.rotationAfterY,
    transformCoords.scaleX,
    transformCoords.scaleY
  );

  UpdateElementTransformReducer.call(elementId, newTransform);
};

export const updateElementTransformNoViewportAdjustment = (elementId: number, transform: string) => {
  const transformCoords = GetCoordsFromTransform(transform);
  const newTransform = GetTransformFromCoords(
    transformCoords.x,
    transformCoords.y,
    transformCoords.rotation,
    transformCoords.rotationAfterX,
    transformCoords.rotationAfterY,
    transformCoords.scaleX,
    transformCoords.scaleY
  );

  UpdateElementTransformReducer.call(elementId, newTransform);
};
