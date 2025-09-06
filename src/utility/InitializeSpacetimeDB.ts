import { SpacetimeDBClient } from "@clockworklabs/spacetimedb-sdk";
import Guests from "../module_bindings/guests";
import AddElementDataArrayReducer from "../module_bindings/add_element_data_array_reducer";
import AddElementDataArrayWithIdReducer from "../module_bindings/add_element_data_array_with_id_reducer";
import AddElementDataReducer from "../module_bindings/add_element_data_reducer";
import AddElementDataWithIdReducer from "../module_bindings/add_element_data_with_id_reducer";
import AddElementReducer from "../module_bindings/add_element_reducer";
import AddElementToLayoutReducer from "../module_bindings/add_element_to_layout_reducer";
import AddLayoutReducer from "../module_bindings/add_layout_reducer";
import AddLayoutWithIdReducer from "../module_bindings/add_layout_with_id_reducer";
import AuthenticateDoWorkReducer from "../module_bindings/authenticate_do_work_reducer";
import AuthenticateReducer from "../module_bindings/authenticate_reducer";
import ConnectReducer from "../module_bindings/connect_reducer";
import DeleteAllElementDataReducer from "../module_bindings/delete_all_element_data_reducer";
import DeleteAllElementsReducer from "../module_bindings/delete_all_elements_reducer";
import DeleteAllLayoutsReducer from "../module_bindings/delete_all_layouts_reducer";
import DeleteElementDataByIdReducer from "../module_bindings/delete_element_data_by_id_reducer";
import DeleteElementDataByNameReducer from "../module_bindings/delete_element_data_by_name_reducer";
import DeleteElementReducer from "../module_bindings/delete_element_reducer";
import DeleteLayoutReducer from "../module_bindings/delete_layout_reducer";
import DuplicateLayoutReducer from "../module_bindings/duplicate_layout_reducer";
import ElementData from "../module_bindings/element_data";
import Elements from "../module_bindings/elements";
import KickGuestReducer from "../module_bindings/kick_guest_reducer";
import KickSelfReducer from "../module_bindings/kick_self_reducer";
import Layouts from "../module_bindings/layouts";
import SetLayoutActiveReducer from "../module_bindings/set_layout_active_reducer";
import UpdateElementClipReducer from "../module_bindings/update_element_clip_reducer";
import UpdateElementDataDataReducer from "../module_bindings/update_element_data_data_reducer";
import UpdateElementDataNameReducer from "../module_bindings/update_element_data_name_reducer";
import UpdateElementDataReducer from "../module_bindings/update_element_data_reducer";
import UpdateElementFolderReducer from "../module_bindings/update_element_folder_reducer";
import UpdateElementLayoutReducer from "../module_bindings/update_element_layout_reducer";
import UpdateElementLockedReducer from "../module_bindings/update_element_locked_reducer";
import UpdateElementReducer from "../module_bindings/update_element_reducer";
import UpdateElementStructReducer from "../module_bindings/update_element_struct_reducer";
import UpdateElementTransformReducer from "../module_bindings/update_element_transform_reducer";
import UpdateElementTransparencyReducer from "../module_bindings/update_element_transparency_reducer";
import UpdateGuestNicknameReducer from "../module_bindings/update_guest_nickname_reducer";
import UpdateGuestPositionReducer from "../module_bindings/update_guest_position_reducer";
import UpdateGuestReducer from "../module_bindings/update_guest_reducer";
import UpdateGuestSelectedElementReducer from "../module_bindings/update_guest_selected_element_reducer";
import UpdateGuestSelectedLayoutReducer from "../module_bindings/update_guest_selected_layout_reducer";
import UpdateImageElementDataStructReducer from "../module_bindings/update_image_element_data_struct_reducer";
import UpdateImageElementHeightReducer from "../module_bindings/update_image_element_height_reducer";
import UpdateImageElementSizeReducer from "../module_bindings/update_image_element_size_reducer";
import UpdateImageElementWidthReducer from "../module_bindings/update_image_element_width_reducer";
import UpdateLayoutNameReducer from "../module_bindings/update_layout_name_reducer";
import UpdateTextElementColorReducer from "../module_bindings/update_text_element_color_reducer";
import UpdateTextElementFontReducer from "../module_bindings/update_text_element_font_reducer";
import UpdateTextElementShadowReducer from "../module_bindings/update_text_element_shadow_reducer";
import UpdateTextElementSizeReducer from "../module_bindings/update_text_element_size_reducer";
import UpdateTextElementTextReducer from "../module_bindings/update_text_element_text_reducer";
import UpdateWidgetElementDataIdReducer from "../module_bindings/update_widget_element_data_id_reducer";
import UpdateWidgetElementHeightReducer from "../module_bindings/update_widget_element_height_reducer";
import UpdateWidgetElementRawDataReducer from "../module_bindings/update_widget_element_raw_data_reducer";
import UpdateWidgetElementSizeReducer from "../module_bindings/update_widget_element_size_reducer";
import UpdateWidgetElementWidthReducer from "../module_bindings/update_widget_element_width_reducer";

const InitializeSpacetimeDB = () => {
  SpacetimeDBClient.registerTables(Guests, Elements, ElementData, Layouts);
  SpacetimeDBClient.registerReducers(
    UpdateGuestReducer,
    UpdateGuestNicknameReducer,
    UpdateGuestSelectedElementReducer,
    UpdateGuestPositionReducer,
    AddElementDataReducer,
    AddElementDataWithIdReducer,
    AddElementDataArrayReducer,
    AddElementDataArrayWithIdReducer,
    UpdateElementDataReducer,
    UpdateElementDataNameReducer,
    UpdateElementDataDataReducer,
    DeleteElementDataByIdReducer,
    DeleteElementDataByNameReducer,
    DeleteAllElementDataReducer,
    AddElementReducer,
    UpdateElementReducer,
    UpdateElementStructReducer,
    UpdateElementTransparencyReducer,
    UpdateElementTransformReducer,
    UpdateElementClipReducer,
    UpdateElementLockedReducer,
    UpdateElementLayoutReducer,
    UpdateElementFolderReducer,
    UpdateTextElementColorReducer,
    UpdateTextElementFontReducer,
    UpdateTextElementSizeReducer,
    UpdateTextElementTextReducer,
    UpdateTextElementShadowReducer,
    UpdateTextElementShadowReducer,
    UpdateWidgetElementSizeReducer,
    UpdateImageElementSizeReducer,
    UpdateImageElementDataStructReducer,
    UpdateImageElementHeightReducer,
    UpdateImageElementWidthReducer,
    UpdateWidgetElementDataIdReducer,
    UpdateWidgetElementRawDataReducer,
    UpdateWidgetElementHeightReducer,
    UpdateWidgetElementWidthReducer,
    DeleteElementReducer,
    DeleteAllElementsReducer,
    AuthenticateReducer,
    AuthenticateDoWorkReducer,
    AddLayoutReducer,
    AddLayoutWithIdReducer,
    UpdateLayoutNameReducer,
    DuplicateLayoutReducer,
    SetLayoutActiveReducer,
    DeleteLayoutReducer,
    DeleteAllLayoutsReducer,
    AddElementToLayoutReducer,
    KickGuestReducer,
    KickSelfReducer,
    ConnectReducer,
    UpdateGuestSelectedLayoutReducer
  );
};

export default InitializeSpacetimeDB;
