<template>
  <div class="home-page">
    <nav class="navbar navbar-expand-lg navbar-dark bg-success shadow-sm fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold">
          📚 Quản Lý Mượn Sách
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a href="#about" class="nav-link">Giới thiệu</a>
            </li>
            <li class="nav-item">
              <a href="#features" class="nav-link">Tính năng</a>
            </li>
            <li class="nav-item">
              <a href="#why" class="nav-link">Vì sao chọn</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'sach.list' }">Sách</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'docgia.list' }">Độc Giả</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-light btn-sm ms-3" to="/login">
                <i class="fas fa-sign-in-alt"></i> Đăng nhập
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-warning btn-sm ms-2" to="/register">
                <i class="fas fa-user-plus"></i> Đăng ký
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <section class="hero text-white text-center d-flex flex-column justify-content-center align-items-center">
      <div class="container">
        <h1 class="display-5 fw-bold fade-in-down">
          <i class="fas fa-book-open"></i> Hệ Thống Quản Lý Mượn Sách
        </h1>
        <p class="lead mt-3 mb-4 fade-in-up delay-1s">
          Giải pháp thông minh cho thư viện – Quản lý sách, độc giả và mượn trả dễ dàng.
        </p>
        <div class="d-flex justify-content-center gap-3 fade-in-up delay-2s">
          <router-link to="/user/books" class="btn btn-light btn-lg shadow">
            <i class="fas fa-book"></i> Xem sách
          </router-link>
          <router-link to="/docgia" class="btn btn-outline-light btn-lg">
            <i class="fas fa-users"></i> Độc giả
          </router-link>
        </div>
      </div>
    </section>

    <section id="about" class="about-section container py-5 text-center">
      <h2 class="fw-bold mb-3 text-success"><i class="fas fa-info-circle"></i> Giới thiệu hệ thống</h2>
      <p class="text-muted">
        Hệ thống giúp thư viện quản lý sách, độc giả và nhân viên một cách tự động và chính xác.
        Dữ liệu được lưu trữ an toàn và có thể truy cập mọi lúc, mọi nơi.
      </p>
    </section>

    <section id="features" class="features-section py-5">
      <div class="container">
       <h2 class="text-center fw-bold mb-4 text-dark">
  <i class="fas fa-cogs"></i> Tính năng nổi bật
</h2>

        <div class="row g-4 text-center">
          <div class="col-md-3" v-for="item in stats" :key="item.title">
            <div class="card shadow-sm feature-card">
              <div class="card-body">
                <i :class="['fs-1', item.icon]"></i>
                <h5 class="fw-bold mt-3">{{ item.title }}</h5>
                <p class="text-muted small">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="why" class="why-section py-5 text-white">
      <div class="container">
        <h2 class="text-center mb-4"><i class="fas fa-star"></i> Vì sao nên chọn chúng tôi?</h2>
        <div class="row g-4 text-center">
          <div class="col-md-4" v-for="reason in reasons" :key="reason.title">
            <div class="p-4 reason-box shadow-sm rounded-4">
              <i :class="['fs-2 mb-3', reason.icon]"></i>
              <h5 class="fw-semibold">{{ reason.title }}</h5>
              <p class="small text-light">{{ reason.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer text-center py-4">
      <p class="mb-1 small text-muted">
        © 2025 Hệ thống Quản Lý Mượn Sách | Thiết kế bởi <b>B2205925 - Nguyễn Nhựt Anh</b>
      </p>
      <div>
        <a href="#" class="text-muted me-3"><i class="fab fa-facebook"></i></a>
        <a href="#" class="text-muted me-3"><i class="fab fa-github"></i></a>
        <a href="#" class="text-muted"><i class="fab fa-envelope"></i></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      stats: [
        { title: "Kho Sách", icon: "fas fa-book text-success", desc: "Quản lý hàng ngàn đầu sách dễ dàng." },
        { title: "Độc Giả", icon: "fas fa-users text-success", desc: "Theo dõi thông tin độc giả nhanh chóng." },
        { title: "Nhân Viên", icon: "fas fa-user-tie text-success", desc: "Phân quyền, quản lý nhân viên hiệu quả." },
        { title: "Mượn Trả", icon: "fas fa-exchange-alt text-success", desc: "Theo dõi lịch sử mượn trả chi tiết." },
      ],
      reasons: [
        { title: "Thiết kế hiện đại", icon: "fas fa-laptop-code", desc: "Giao diện đẹp, thân thiện, dễ thao tác." },
        { title: "Hiệu năng mạnh mẽ", icon: "fas fa-rocket", desc: "Xử lý nhanh, phản hồi tức thì." },
        { title: "Bảo mật cao", icon: "fas fa-shield-alt", desc: "An toàn tuyệt đối cho dữ liệu thư viện." },
      ],
    };
  },
};
</script>

<style scoped>
.home-page {
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
}

.navbar .nav-link.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

.hero {
  background: linear-gradient(120deg, #22c55e, #16a34a);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 80px;
}

.fade-in-down {
  animation: fadeInDown 1s ease both;
}
.fade-in-up {
  animation: fadeInUp 1s ease both;
}
.delay-1s {
  animation-delay: 0.5s;
}
.delay-2s {
  animation-delay: 1s;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.features-section {
  background-color: #ecfdf5;
}
.feature-card {
  transition: 0.3s ease;
  border: none;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.why-section {
  background: linear-gradient(135deg, #16a34a, #065f46);
}
.reason-box {
  transition: all 0.3s ease;
}
.reason-box:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.15);
}

.footer {
  background-color: #f0fdf4;
  border-top: 1px solid #d1fae5;
}
</style>
