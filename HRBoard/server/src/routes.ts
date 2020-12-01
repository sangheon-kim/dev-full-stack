import { makeErrorResponse, makeSucessedResponse } from "./utils";
import express, { Response, Request } from "express";

const router = express.Router();
import model from "./Model";
import sequelize from "./db";

// create some data to table
router.post("/user", (req: Request, res: Response) => {
  model.User.create(req.body)
    .then(() => makeSucessedResponse({ res }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

// bulk create method
router.post("/bulk-user", (req: Request, res: Response) => {
  model.User.bulkCreate([
    {
      name: "User1",
      email: "user1@gmail.com",
      rollNo: 51,
      status: 1,
    },
    {
      name: "User2",
      email: " user2@gmail.com",
      rollNo: 52,
      status: 1,
    },
    {
      name: "User3",
      email: " user3@gmail.com",
      rollNo: 53,
      status: 1,
    },
    {
      name: "User4",
      email: " user4@gmail.com",
      rollNo: 54,
      status: 1,
    },
  ])
    .then(() => makeSucessedResponse({ res }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

// delete api method
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  model.User.destroy({
    where: {
      id,
    },
  })
    .then((result: any) => {
      if (result > 0) {
        makeSucessedResponse({ res, message: "User has been deleted successfully" });
      } else {
        makeErrorResponse({ err: new Error("Error"), res, message: "User is not exist" });
      }
    })
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

// update api method
router.put("/user", (req: Request, res: Response) => {
  const { id, name, email, rollNo } = req.body;
  model.User.update(
    {
      name,
      email,
      rollNo,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => makeSucessedResponse({ res, message: "User has been Updated successfully" }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

// get all users
router.get("/users", (req: Request, res: Response) => {
  model.User.findAll({ where: { rollNo: 21 } })
    .then((users: any) => {
      const data = { ...users };
      makeSucessedResponse({ res, data });
    })
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

// default welcome page route
router.get("/", (_: Request, res: Response) => {
  makeSucessedResponse({ res, message: "Welcome To Get Method" });
});

// raw query to select data
router.get("/user-raw", (req, res) => {
  sequelize
    .query("SELECT * from tbl_users", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result: any) => makeSucessedResponse({ res, data: result }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

// raw query to update data
router.put("/user-raw", (req, res) => {
  const { name, email, id } = req.body;
  sequelize
    .query(`UPDATE tbl_users SET name="${name}",email="${email}" WHERE id=${id}`, {
      type: sequelize.QueryTypes.UPDATE,
    })
    .then(() => makeSucessedResponse({ res, message: "User has been Updated successfully" }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

router.delete("/user-raw/:id", (req, res) => {
  const { id } = req.params;
  sequelize
    .query(`DELETE FROM tbl_users WHERE id=${id}`, {
      type: sequelize.QueryTypes.DELETE,
    })
    .then(() => makeSucessedResponse({ res, message: "User has been deleted successfully" }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
});

export default router;
