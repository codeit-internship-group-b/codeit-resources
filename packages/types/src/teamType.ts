export interface ITeam {
  name: string;
  order: number;
}

export interface TeamType extends ITeam {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
