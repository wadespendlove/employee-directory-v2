import express from "express";
import employeesRouter from "#api/employeesRoutes";

const app = express();
const router = express.Router();

app.use(express.json());

router.use("/employees", employeesRouter);

app.use("/", router);

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

export default app;

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).send({
//     message: err.message || "SOMETHING BROKE!",
//   });
// });
