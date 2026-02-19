app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/references", require("./routes/referenceRoutes"));
app.use("/api/users", require("./routes/userRoutes"));