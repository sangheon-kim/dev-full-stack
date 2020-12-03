import Model from "../models";
// export abstract class Controller {
//   constructor() {}
//   abstract create(request: any): void;
//   abstract bulkCreate(): void;
//   abstract read(): void;
//   abstract readDetail(): void;
//   abstract update(): void;
//   abstract bulkUpdate(): void;
//   abstract delete(): void;
//   abstract bulkDelete(): void;
// }

class UserController {
  model: any;
  constructor() {
    this.model = Model.User;
  }
  create(request: any) {
    console.log(request);
    // this.model.create(request);
  }
}

export const user = new UserController();

// export default {
//   user,
// };
