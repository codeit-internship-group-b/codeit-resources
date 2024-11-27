export interface ITeam {
  name: string;
}

export interface TeamType extends ITeam {
  _id: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
