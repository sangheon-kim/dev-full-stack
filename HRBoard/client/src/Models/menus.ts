// interface

export default class Thead {
  static index: number;
  name: string;
  uniKey: string;
  constructor(name: string) {
    this.name = name;
    this.uniKey = `${Thead.index}-${name}`;
  }
}
