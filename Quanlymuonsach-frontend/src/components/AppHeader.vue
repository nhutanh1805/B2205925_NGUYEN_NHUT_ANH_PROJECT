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
            <router-link class="nav-link" :to="{ name: 'sach.list' }">
              Sách
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'docgia.list' }">
              Độc Giả
            </router-link>
          </li>

          <li class="nav-item">
            <span class="nav-link disabled" style="opacity:0.6;cursor:not-allowed;">
              Mượn Trả
            </span>
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
