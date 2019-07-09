export interface IReseume {
  id?: number;
  educationId?: number;
}

export class Reseume implements IReseume {
  constructor(public id?: number, public educationId?: number) {}
}
