export const CategoryType = ["room", "equipment"] as const; // 회의실, 장비
export type TCategoryType = (typeof CategoryType)[number];

export interface ICategory {
  _id: string;
  name: string;
  itemType: TCategoryType;
}
