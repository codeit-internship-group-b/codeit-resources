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

export const getAllRooms = async (): Promise<IRoom[]> => {
  const { data } = await axiosRequester<IRoom[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.ITEMS.GET_ALL("room"),
    },
  });
  return data;
};

export const postNewRoom = async (itemType: TItemType, body: Record<string, string>): Promise<IRoom | IEquipment> => {
  const { data } = await axiosRequester<IRoom | IEquipment>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.ITEMS.CREATE_ITEM(itemType),
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    },
  });

  return data;
};

export const patchRoom = async (itemId: string, body: Record<string, string>): Promise<IRoom | IEquipment> => {
  const { data } = await axiosRequester<IRoom | IEquipment>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.ITEMS.UPDATE_ITEM(itemId),
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    },
  });

  return data;
};

export const deleteRoom = async (itemId: string): Promise<string> => {
  const { data } = await axiosRequester<string>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.ITEMS.DELETE_ITEM(itemId),
    },
  });

  return data;
};

export const postNewCategory = async (body: Record<string, string>): Promise<ICategory> => {
  const { data } = await axiosRequester<ICategory>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.CATEGORIES.CREATE_CATEGORY,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    },
  });

  return data;
};

export const patchCategory = async (categoryId: string, body: Record<string, string>): Promise<IRoom | IEquipment> => {
  const { data } = await axiosRequester<IRoom | IEquipment>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.CATEGORIES.UPDATE_CATEGORY(categoryId),
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    },
  });

  return data;
};

export const deleteCategory = async (categoryId: string): Promise<string> => {
  const { data } = await axiosRequester<string>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.CATEGORIES.DELETE_CATEGORY(categoryId),
    },
  });

  return data;
};
