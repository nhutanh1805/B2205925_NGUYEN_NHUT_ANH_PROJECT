<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">
              <i class="fas fa-plus me-2"></i>Thêm Nhà Xuất Bản Mới
            </h5>
          </div>
          <div class="card-body">
            <NhaXuatBanForm @submit:nxb="handleSubmit" />
          </div>
          <div class="card-footer bg-light">
            <router-link to="/nhaxuatban" class="btn btn-secondary">
              <i class="fas fa-arrow-left me-2"></i>Quay lại
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NhaXuatBanService from '@/services/nhaxuatban.service'
import NhaXuatBanForm from '@/components/NhaXuatBanForm.vue'

export default {
  name: 'NhaXuatBanAdd',
  components: {
    NhaXuatBanForm
  },
  methods: {
    async handleSubmit(data) {
      try {
        await NhaXuatBanService.create(data)
        this.$toast.success('Thêm nhà xuất bản thành công!')
        this.$router.push('/nhaxuatban')
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Lỗi khi thêm nhà xuất bản!')
      }
    }
  }
}
</script>