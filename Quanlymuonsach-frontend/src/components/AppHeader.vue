<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">📚 Quản Lý Mượn Sách</a>

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
            <router-link class="nav-link" to="/">
              <i class="fas fa-home me-1"></i>Trang chủ
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'sach.list' }">
              <i class="fas fa-book me-1"></i>Quản lý Sách
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'nhaxuatban.list' }">
              <i class="fas fa-building me-1"></i>Quản lý Nhà Xuất Bản
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'docgia.list' }">
              <i class="fas fa-user-friends me-1"></i>Quản lý Đọc giả
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'phieumuon.list' }">
              <i class="fas fa-file-invoice me-1"></i>Quản lý Phiếu mượn
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>