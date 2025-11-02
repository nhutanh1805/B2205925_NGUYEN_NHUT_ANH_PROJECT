const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

// import các route
const TheodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const SachsRouter = require("./app/routes/sach.route");
const DocGiasRouter = require("./app/routes/docgia.route"); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "📚 Chào mừng đến với API Quản Lý Mượn Sách" });
});

// các router chính
app.use("/api/theodoimuonsach", TheodoimuonsachRouter);
app.use("/api/sach", SachsRouter);
app.use("/api/docgia", DocGiasRouter); 

// xử lý 404
app.use((req, res, next) => {
  next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

// xử lý lỗi chung
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Lỗi máy chủ nội bộ",
  });
});

module.exports = app;
