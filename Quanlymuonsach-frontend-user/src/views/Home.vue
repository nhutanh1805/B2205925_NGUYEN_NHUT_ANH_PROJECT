<template>
  <div class="home-page">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold">
          📚 Thư Viện Trực Tuyến
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
              <router-link class="nav-link" :to="{ name: 'sach.list' }"
                >Sách</router-link
              >
            </li>

            <template v-if="!user">
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
            </template>

            <template v-else>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle fw-bold text-warning"
                  href="/thongtincanhan"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {{ user.HoTen }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <button class="dropdown-item text-danger" @click="logout">
                      <i class="fas fa-sign-out-alt"></i> Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <section
      class="vh-100 d-flex align-items-center text-white position-relative"
      style="
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
          url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80')
            center/cover no-repeat;
      "
    >
      <div class="container text-center position-relative">
        <h1 class="display-4 fw-bold mb-3">
          <i class="fas fa-book-open me-2"></i> Thư Viện Trực Tuyến
        </h1>
        <p class="lead mb-5">
          Khám phá, mượn và quản lý sách dễ dàng từ mọi nơi.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3 mb-5">
          <a href="/sach" class="btn btn-light btn-lg shadow px-4">
            <i class="fas fa-book me-2"></i> Xem sách
          </a>
          <a href="/sach" class="btn btn-outline-light btn-lg px-4">
            <i class="fas fa-exchange-alt me-2"></i> Mượn/Trả
          </a>
        </div>

        <div class="row justify-content-center g-3">
          <div class="col-6 col-md-3">
            <div class="p-3 bg-dark bg-opacity-50 rounded">
              <i class="fas fa-book fa-2x mb-2 text-warning"></i>
              <h5 class="fw-bold mb-0">10.000+</h5>
              <small>Đầu sách</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 bg-dark bg-opacity-50 rounded">
              <i class="fas fa-user-graduate fa-2x mb-2 text-info"></i>
              <h5 class="fw-bold mb-0">5.000+</h5>
              <small>Độc giả</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 bg-dark bg-opacity-50 rounded">
              <i class="fas fa-handshake fa-2x mb-2 text-success"></i>
              <h5 class="fw-bold mb-0">24/7</h5>
              <small>Hỗ trợ</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about-section py-5">
      <div class="container">
        <h2
          class="fw-bold mb-5 text-center text-primary animate__animated animate__fadeInDown"
        >
          <i class="fas fa-info-circle me-2"></i>Khám Phá Thư Viện Thông Minh
        </h2>

        <div class="row align-items-center">
          <!-- Hình ảnh -->
          <div
            class="col-md-6 mb-4 mb-md-0 text-center animate__animated animate__fadeInLeft"
          >
            <div
              class="rounded-4 overflow-hidden shadow-lg border border-3 border-primary-subtle"
              style="max-height: 380px"
            >
              <img
                src="https://img.freepik.com/free-vector/people-library-isometric-illustration_1284-64336.jpg"
                alt="Library"
                class="img-fluid"
                style="object-fit: cover; width: 100%; height: 100%"
              />
            </div>
          </div>

          <!-- Nội dung -->
          <div class="col-md-6 animate__animated animate__fadeInRight">
            <p class="fs-5 text-muted mb-4">
              Chào mừng bạn đến với hệ thống thư viện hiện đại – nơi tri thức
              được số hóa, giúp bạn tiếp cận hàng nghìn đầu sách nhanh chóng,
              tiện lợi và đầy cảm hứng.
            </p>

            <div
              class="p-4 rounded-4 shadow-sm bg-light border-start border-4 border-primary"
            >
              <ul class="list-unstyled mb-0">
                <li class="mb-3">
                  <i class="fas fa-bolt text-primary me-2"></i>
                  <span class="fw-semibold">Tìm kiếm siêu nhanh</span> – chỉ cần
                  vài giây là có ngay cuốn sách bạn cần.
                </li>
                <li class="mb-3">
                  <i class="fas fa-book-reader text-primary me-2"></i>
                  <span class="fw-semibold">Lịch sử mượn trả rõ ràng</span> –
                  theo dõi hành trình đọc sách của bạn.
                </li>
                <li class="mb-3">
                  <i class="fas fa-user-shield text-primary me-2"></i>
                  <span class="fw-semibold">Quản lý thông tin cá nhân</span> dễ
                  dàng và bảo mật tuyệt đối.
                </li>
                <li class="mb-2">
                  <i class="fas fa-heart text-primary me-2"></i>
                  <span class="fw-semibold">Khơi nguồn đam mê đọc sách</span>
                  mọi lúc, mọi nơi.
                </li>
              </ul>
            </div>

            <div class="mt-4">
              <a href="/books" class="btn btn-primary btn-lg px-4 shadow-sm">
                <i class="fas fa-search me-2"></i>Khám phá sách ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="py-5 bg-light">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Tính năng nổi bật</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-md-4" v-for="item in features" :key="item.title">
            <div class="p-4 bg-white rounded shadow-sm h-100">
              <i :class="['fs-2 mb-3', item.icon]"></i>
              <h5>{{ item.title }}</h5>
              <p class="small text-muted">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer text-center py-4">
      <p class="mb-1 small text-muted">
        © 2025 Thư Viện Trực Tuyến | Thiết kế bởi
        <b>B2205925 - Nguyễn Nhựt Anh</b>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeUser",
  data() {
    return {
      user: null,
      features: [
        {
          title: "Xem sách",
          icon: "fas fa-book text-primary",
          desc: "Tìm kiếm và tra cứu sách nhanh chóng.",
        },
        {
          title: "Mượn trả",
          icon: "fas fa-exchange-alt text-success",
          desc: "Quản lý lịch sử mượn trả cá nhân.",
        },
        {
          title: "Thông tin cá nhân",
          icon: "fas fa-user text-info",
          desc: "Quản lý thông tin tài khoản của bạn.",
        },
      ],
    };
  },
  created() {
    const saved = localStorage.getItem("user");
    if (saved) this.user = JSON.parse(saved);
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
    },
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

.vh-100 {
  min-height: 100vh;
}

.features-section {
  background-color: #f0f8ff;
}

.footer {
  background-color: #e0f7fa;
  border-top: 1px solid #b2ebf2;
}
</style>
