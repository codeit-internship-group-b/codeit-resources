import { API_ENDPOINTS } from "@repo/constants";
import { type TBaseItem, type TItemType, type IRoom, type ISeat, type IEquipment } from "@repo/types";
import { axiosRequester } from "@/lib/axios";

// 특정 타입의 아이템 조회
interface GetAllItemsParams {
  itemType: TItemType;
}

export const getAllItems = async (params: GetAllItemsParams): Promise<TBaseItem[]> => {
  const { itemType } = params;
  const { data } = await axiosRequester<TBaseItem[]>({
    options: {
      method: "GET",
      url: API_ENDPOINTS.ITEMS.GET_ALL(itemType),
    },
  });

  return data;
};

// 아이템 생성
interface CreateItemParams {
  itemType: TItemType;
  itemData: Partial<IRoom | ISeat | IEquipment>;
}

export const createItem = async (params: CreateItemParams): Promise<TBaseItem> => {
  const { itemType, itemData } = params;
  const { data } = await axiosRequester<TBaseItem>({
    options: {
      method: "POST",
      url: API_ENDPOINTS.ITEMS.CREATE_ITEM,
      data: {
        itemType,
        ...itemData,
      },
    },
  });

  return data;
};

// 아이템 업데이트
interface UpdateItemParams {
  itemId: string;
  itemData: Partial<IRoom | ISeat | IEquipment>;
}

export const updateItem = async (params: UpdateItemParams): Promise<TBaseItem> => {
  const { itemId, itemData } = params;
  const { data } = await axiosRequester<TBaseItem>({
    options: {
      method: "PATCH",
      url: API_ENDPOINTS.ITEMS.UPDATE_ITEM(itemId),
      data: itemData,
    },
  });

  return data;
};

// 아이템 삭제
export const deleteItem = async (itemId: string): Promise<{ message: string }> => {
  const { data } = await axiosRequester<{ message: string }>({
    options: {
      method: "DELETE",
      url: API_ENDPOINTS.ITEMS.DELETE_ITEM(itemId),
    },
  });

  return data;
};
