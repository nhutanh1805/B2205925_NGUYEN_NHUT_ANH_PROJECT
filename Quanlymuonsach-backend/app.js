const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

// import các route
const TheodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");
const SachsRouter = require("./app/routes/sach.route");
const DocGiasRouter = require("./app/routes/docgia.route");
const NhanViensRouter = require("./app/routes/nhanvien.route");
const NhaXuatBansRouter = require("./app/routes/nhaxuatban.route"); 

const app = express();

app.use(cors());
app.use(express.json());

// route mặc định
app.get("/", (req, res) => {
  res.json({ message: "📚 Chào mừng đến với API Quản Lý Mượn Sách" });
});

// các router chính
app.use("/api/theodoimuonsach", TheodoimuonsachRouter);
app.use("/api/sach", SachsRouter);
app.use("/api/docgia", DocGiasRouter);
app.use("/api/nhanvien", NhanViensRouter);
app.use("/api/nhaxuatban", NhaXuatBansRouter); 

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
