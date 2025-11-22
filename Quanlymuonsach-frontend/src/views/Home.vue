<template>
  <div class="home-page">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-success shadow-sm fixed-top"
    >
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
              <router-link class="nav-link" :to="{ name: 'sach.list' }"
                >Sách</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'docgia.list' }"
                >Độc Giả</router-link
              >
            </li>

             <!-- Nếu chưa đăng nhập -->
            <template v-if="!user">
              <li class="nav-item">
                <router-link class="btn btn-light btn-sm ms-3" to="/nhanvien/login">
                  <i class="fas fa-sign-in-alt"></i> Đăng nhập nhân viên
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-warning btn-sm ms-2" to="/nhanvien/register">
                  <i class="fas fa-user-plus"></i> Đăng ký nhân viên
                </router-link>
              </li>
            </template>

            <!-- Nếu đã đăng nhập -->
            <template v-else>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle fw-bold text-warning" href="#" id="userDropdown"
                  role="button" data-bs-toggle="dropdown">
                  Admin
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
          <i class="fas fa-book-open me-2"></i> Hệ Thống Quản Lý Mượn Sách
        </h1>
        <p class="lead mb-5">
          Giải pháp <strong>thông minh</strong> cho thư viện – Quản lý sách, độc
          giả và mượn trả <em>dễ dàng</em> hơn bao giờ hết.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3 mb-5">
          <a href="/sach" class="btn btn-light btn-lg shadow px-4">
            <i class="fas fa-book me-2"></i> Xem sách
          </a>
          <a href="/docgia" class="btn btn-outline-light btn-lg px-4">
            <i class="fas fa-users me-2"></i> Độc giả
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
          <div class="col-6 col-md-3">
            <div class="p-3 bg-dark bg-opacity-50 rounded">
              <i class="fas fa-lock fa-2x mb-2 text-danger"></i>
              <h5 class="fw-bold mb-0">Bảo mật</h5>
              <small>An toàn dữ liệu</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about-section py-5">
      <div class="container">
        <h2
          class="fw-bold mb-5 text-success text-center animate__animated animate__fadeInDown"
        >
          <i class="fas fa-info-circle me-2"></i> Giới thiệu Hệ Thống Quản Lý
          Mượn Sách
        </h2>

        <div class="row align-items-center">
          <div
            class="col-md-6 text-center mb-4 mb-md-0 animate__animated animate__fadeInLeft"
          >
            <img
              src="https://img.freepik.com/free-vector/modern-library-interior-flat-design_23-2147499732.jpg"
              alt="Library Illustration"
              class="img-fluid rounded-4 shadow-lg border border-2 border-success-subtle"
              style="max-height: 360px; object-fit: cover"
            />
          </div>

          <div class="col-md-6 animate__animated animate__fadeInRight">
            <p class="text-muted fs-5">
              <b>Quản Lý Mượn Sách</b> là giải pháp công nghệ tiên tiến giúp thư
              viện vận hành thông minh hơn — hỗ trợ quản lý <b>sách</b>,
              <b>độc giả</b>, <b>nhân viên</b> và <b>mượn trả</b> một cách nhanh
              chóng, chính xác và chuyên nghiệp.
            </p>

            <p class="text-muted">
              Được phát triển dựa trên nền tảng <b>Node.js</b> và <b>Vue.js</b>,
              hệ thống mang đến giao diện thân thiện, tốc độ phản hồi mượt mà,
              cùng khả năng mở rộng linh hoạt cho mọi quy mô thư viện.
            </p>

            <ul class="list-unstyled features-list">
              <li>
                <i class="fas fa-check-circle text-success me-2"></i> Quản lý dữ
                liệu hoàn toàn tự động & đồng bộ.
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i> Tra cứu
                sách & độc giả cực nhanh chỉ với vài giây.
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i> Hỗ trợ
                phân quyền nhân viên, bảo mật cao.
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i> Giao diện
                tối ưu cho cả máy tính và di động.
              </li>
            </ul>

            <div class="mt-4 alert alert-success border-0 shadow-sm fade show">
              <i class="fas fa-leaf me-2"></i>
              <b>Mục tiêu:</b> “Chuyển đổi số toàn diện trong công tác quản lý
              thư viện – Nâng cao trải nghiệm người đọc, tối ưu hiệu quả quản lý
              và vận hành.”
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold text-dark">
            <i class="fas fa-bolt text-primary me-2"></i> Tính năng nổi bật
          </h2>
          <p class="text-muted">
            Khám phá cách hệ thống giúp thư viện của bạn vận hành hiệu quả hơn.
          </p>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="d-flex flex-column position-relative">
              <div
                class="position-absolute top-0 start-50 translate-middle bg-primary"
                style="width: 4px; height: 100%; opacity: 0.2"
              ></div>

              <div
                v-for="(item, index) in stats"
                :key="item.title"
                class="d-flex align-items-start position-relative mb-5"
                :class="
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-end'
                "
              >
                <div
                  class="position-relative z-2 rounded-circle d-flex align-items-center justify-content-center"
                  :style="{
                    width: '70px',
                    height: '70px',
                    background: `radial-gradient(circle at 30% 30%, ${item.colorLight}, ${item.colorDark})`,
                    color: '#fff',
                    boxShadow: `0 0 20px ${item.colorDark}66, 0 0 40px ${item.colorDark}33`,
                  }"
                >
                  <i :class="['fs-3', item.icon]"></i>
                </div>

                <div class="flex-grow-1 px-4">
                  <h5 class="fw-bold text-dark mb-1">{{ item.title }}</h5>
                  <p class="text-muted small mb-0">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <a href="/sach" class="btn btn-primary btn-lg px-4 shadow">
            <i class="fas fa-book-open me-2"></i> Bắt đầu sử dụng
          </a>
        </div>
      </div>
    </section>

    <section id="why" class="why-section py-5 text-white">
      <div class="container">
        <h2 class="text-center mb-4">
          <i class="fas fa-star"></i> Vì sao nên chọn chúng tôi?
        </h2>
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
        © 2025 Hệ thống Quản Lý Mượn Sách | Thiết kế bởi
        <b>B2205925 - Nguyễn Nhựt Anh</b>
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
      user: null,
      stats: [
        {
          title: "Kho Sách",
          icon: "fas fa-book text-success",
          desc: "Quản lý hàng ngàn đầu sách dễ dàng.",
        },
        {
          title: "Độc Giả",
          icon: "fas fa-users text-success",
          desc: "Theo dõi thông tin độc giả nhanh chóng.",
        },
        {
          title: "Nhân Viên",
          icon: "fas fa-user-tie text-success",
          desc: "Phân quyền, quản lý nhân viên hiệu quả.",
        },
        {
          title: "Mượn Trả",
          icon: "fas fa-exchange-alt text-success",
          desc: "Theo dõi lịch sử mượn trả chi tiết.",
        },
      ],
      reasons: [
        {
          title: "Thiết kế hiện đại",
          icon: "fas fa-laptop-code",
          desc: "Giao diện đẹp, thân thiện, dễ thao tác.",
        },
        {
          title: "Hiệu năng mạnh mẽ",
          icon: "fas fa-rocket",
          desc: "Xử lý nhanh, phản hồi tức thì.",
        },
        {
          title: "Bảo mật cao",
          icon: "fas fa-shield-alt",
          desc: "An toàn tuyệt đối cho dữ liệu thư viện.",
        },
      ],
    };
  },
  created() {
    const saved = localStorage.getItem("user");
    if (saved) {
      this.user = JSON.parse(saved);
    }
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
