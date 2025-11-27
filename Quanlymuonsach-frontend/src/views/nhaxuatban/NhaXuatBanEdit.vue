<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="fas fa-edit me-2"></i>Cập nhật Nhà Xuất Bản
            </h5>
            <router-link to="/nhaxuatban" class="btn btn-outline-light btn-sm">
              <i class="fas fa-arrow-left me-1"></i>Quay lại
            </router-link>
          </div>
          <div class="card-body">
            <NhaXuatBanForm 
              :nxb="nhaXuatBan" 
              :loading="loading"
              @submit:nxb="handleSubmit" 
            />
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
  name: 'NhaXuatBanEdit',
  components: {
    NhaXuatBanForm
  },
  data() {
    return {
      nhaXuatBan: {},
      loading: false
    }
  },
  async mounted() {
    await this.fetchNhaXuatBan()
  },
  methods: {
    async fetchNhaXuatBan() {
      this.loading = true
      try {
        this.nhaXuatBan = await NhaXuatBanService.get(this.$route.params.id)
      } catch (error) {
        this.$toast.error('Không tìm thấy nhà xuất bản!')
        this.$router.push('/nhaxuatban')
      } finally {
        this.loading = false
      }
    },
    async handleSubmit(data) {
      this.loading = true
      try {
        await NhaXuatBanService.update(this.$route.params.id, data)
        this.$toast.success('Cập nhật thành công!')
        this.$router.push('/nhaxuatban')
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Lỗi khi cập nhật!')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>