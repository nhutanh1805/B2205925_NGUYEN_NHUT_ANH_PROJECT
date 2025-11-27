<template>
  <div class="card shadow-sm">
    <div class="card-header bg-light d-flex justify-content-between align-items-center">
      <h6 class="mb-0">
        <i class="fas fa-list me-2"></i>
        Danh sách Nhà Xuất Bản ({{ nhaXuatBans.length }})
      </h6>
      <div class="d-flex gap-2">
        <router-link to="/nhaxuatban/add" class="btn btn-success btn-sm">
          <i class="fas fa-plus me-1"></i>Thêm mới
        </router-link>
        <button 
          class="btn btn-danger btn-sm" 
          @click="handleDeleteAll"
          :disabled="loading || nhaXuatBans.length === 0"
        >
          <i class="fas fa-trash-alt me-1"></i>
          Xóa tất cả
        </button>
        <button 
          class="btn btn-outline-secondary btn-sm" 
          @click="refresh"
          :disabled="loading"
        >
          <i class="fas fa-sync-alt me-1"></i>
          Làm mới
        </button>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th width="120">Mã NXB</th>
              <th width="200">Tên NXB</th>
              <th>Địa chỉ</th>
              <th width="120">SĐT</th>
              <th width="150">Email</th>
              <th width="140">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td :colspan="6" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Đang tải...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="nhaXuatBans.length === 0">
              <td :colspan="6" class="text-center py-5 text-muted">
                <i class="fas fa-building fa-3x mb-3 opacity-50"></i>
                <p class="mb-0">Chưa có nhà xuất bản nào</p>
              </td>
            </tr>
            <tr v-else v-for="nxb in nhaXuatBans" :key="nxb._id">
              <td>
                <strong class="text-primary">{{ nxb.MaNXB }}</strong>
              </td>
              <td>{{ nxb.TenNXB }}</td>
              <td class="text-truncate" style="max-width: 250px" :title="nxb.DiaChi || '-'">
                {{ nxb.DiaChi || '-' }}
              </td>
              <td>{{ nxb.SoDienThoai || '-' }}</td>
              <td class="text-truncate" style="max-width: 150px" :title="nxb.Email || '-'">
                {{ nxb.Email || '-' }}
              </td>
              <td>
                <div class="btn-group btn-group-sm" role="group">
                  <router-link 
                    :to="`/nhaxuatban/edit/${nxb._id}`" 
                    class="btn btn-outline-primary"
                    title="Sửa"
                  >
                    <i class="fas fa-edit"></i>
                  </router-link>
                  <button 
                    class="btn btn-outline-danger" 
                    @click="handleDelete(nxb._id)"
                    :disabled="loading"
                    title="Xóa"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NhaXuatBanService from '@/services/nhaxuatban.service'

export default {
  name: 'NhaXuatBanList',
  data() {
    return {
      nhaXuatBans: [],
      loading: false
    }
  },
  async mounted() {
    await this.fetchAll()
  },
  methods: {
    async fetchAll() {
      this.loading = true
      try {
        this.nhaXuatBans = await NhaXuatBanService.getAll()
      } catch (error) {
        this.$toast.error('Lỗi khi tải danh sách nhà xuất bản!')
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async handleDelete(id) {
      if (!confirm('Bạn có chắc muốn xóa nhà xuất bản này?')) return
      
      this.loading = true
      try {
        await NhaXuatBanService.delete(id)
        this.$toast.success('Xóa thành công!')
        await this.fetchAll()
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Lỗi khi xóa!')
      } finally {
        this.loading = false
      }
    },

    async handleDeleteAll() {
      if (!confirm('Bạn có chắc muốn xóa TẤT CẢ nhà xuất bản?')) return
      
      this.loading = true
      try {
        await NhaXuatBanService.deleteAll()
        this.$toast.success('Xóa tất cả thành công!')
        this.nhaXuatBans = []
      } catch (error) {
        this.$toast.error('Lỗi khi xóa tất cả!')
      } finally {
        this.loading = false
      }
    },

    refresh() {
      this.fetchAll()
    }
  }
}
</script>