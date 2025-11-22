<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">📚 Thư Viện Trực Tuyến</router-link>

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
            <router-link class="nav-link" to="/">Trang chủ</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'sach.list' }">Sách</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'phieumuon.list' }">Phiếu mượn</router-link>
          </li>

          <template v-if="!user">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Đăng nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Đăng ký</router-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                {{ user.HoTen }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <button class="dropdown-item text-danger" @click="logout">
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$emit('logout'); // thông báo component cha xử lý logout
    }
  }
}
</script>

<style scoped>
.nav-link.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
