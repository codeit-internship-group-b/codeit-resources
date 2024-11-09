export interface ITeam {
  name: string;
}

export interface TeamType extends ITeam {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
