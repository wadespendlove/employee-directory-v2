import express from "express";
const employeesRouter = express.Router();

import employees from "#db/employees";

employeesRouter.get("/", (req, res) => {
  res.send(employees);
});

employeesRouter.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeesRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

employeesRouter.post("/", (req, res) => {
  const body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).send("Request body must be a valid object.");
  }
  const { name } = body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("The name is required.");
  }
  const newEmployee = {
    id: employees.length + 1,
    name,
  };
  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

export default employeesRouter;
