export interface Entity {
  id: string;
}

export class BaseService<T extends Entity> {
  protected entities: T[] = [];

  findAll() {
    return this.entities;
  }

  findOne(id: string) {
    return this.entities.find((track) => track.id === id);
  }

  remove(id: string) {
    const trackIndex = this.entities.findIndex((user) => user.id === id);

    if (trackIndex === -1) {
      return undefined;
    } else {
      return this.entities.splice(trackIndex, 1);
    }
  }
}
