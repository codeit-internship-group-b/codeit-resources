import { API_ENDPOINTS } from "@repo/constants";
import { type IRoom, type ICategory, type TItemType, type IEquipment } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

export const getAllCategories = async (): Promise<ICategory[]> => {
  const { data } = await axiosRequester<ICategory[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.CATEGORIES.GET_ALL,
    },
  });
  return data;
};

export const postNewItem = async (itemType: TItemType, body: FormData): Promise<IRoom | IEquipment> => {
  const { data } = await axiosRequester<IRoom | IEquipment>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.ITEMS.CREATE_ITEM(itemType),
      data: body,
    },
  });

  return data;
};

export const patchItem = async (itemId: string, body: FormData): Promise<IRoom | IEquipment> => {
  const { data } = await axiosRequester<IRoom | IEquipment>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.ITEMS.UPDATE_ITEM(itemId),
      data: body,
    },
  });

  return data;
};
