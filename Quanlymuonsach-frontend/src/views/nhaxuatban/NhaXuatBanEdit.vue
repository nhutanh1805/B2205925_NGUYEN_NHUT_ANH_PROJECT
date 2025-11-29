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
            <form @submit.prevent="submit">
              <div class="row g-4">
                <div class="col-md-6">
                  <label class="form-label fw-semibold text-dark">Mã NXB <span class="text-danger">*</span></label>
                  <input 
                    v-model="form.MaNXB" 
                    class="form-control form-control-lg" 
                    :class="{ 'is-invalid': errors.MaNXB }"
                    required 
                    maxlength="10"
                    placeholder="VD: NXB001"
                  >
                  <div v-if="errors.MaNXB" class="invalid-feedback">
                    {{ errors.MaNXB }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold text-dark">Tên NXB <span class="text-danger">*</span></label>
                  <input 
                    v-model="form.TenNXB" 
                    class="form-control form-control-lg" 
                    :class="{ 'is-invalid': errors.TenNXB }"
                    required 
                    placeholder="VD: Nhà xuất bản Giáo dục"
                  >
                  <div v-if="errors.TenNXB" class="invalid-feedback">
                    {{ errors.TenNXB }}
                  </div>
                </div>
              </div>

              <div class="row g-4 mt-4">
                <div class="col-md-6">
                  <label class="form-label fw-semibold text-dark">Địa chỉ</label>
                  <input 
                    v-model="form.DiaChi" 
                    class="form-control"
                    placeholder="VD: 123 Đường ABC, Quận 1, TP.HCM"
                  >
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold text-dark">Số điện thoại</label>
                  <input 
                    v-model="form.SoDienThoai" 
                    class="form-control"
                    type="tel"
                    placeholder="VD: 0123456789"
                  >
                </div>
              </div>

              <div class="row g-4 mt-4">
                <div class="col-12">
                  <label class="form-label fw-semibold text-dark">Email</label>
                  <input 
                    v-model="form.Email" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.Email }"
                    type="email"
                    placeholder="VD: info@nxb.com"
                  >
                  <div v-if="errors.Email" class="invalid-feedback">
                    {{ errors.Email }}
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
                <button 
                  type="button" 
                  class="btn btn-outline-secondary btn-lg px-4"
                  @click="reset"
                >
                  <i class="fas fa-undo-alt me-2"></i>Reset
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg px-5"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="fas fa-save me-2"></i>
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NhaXuatBanService from '@/services/nhaxuatban.service'

export default {
  name: 'NhaXuatBanEdit',
  data() {
    return {
      form: {
        MaNXB: '',
        TenNXB: '',
        DiaChi: '',
        SoDienThoai: '',
        Email: ''
      },
      errors: {},
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
        const nhaXuatBan = await NhaXuatBanService.get(this.$route.params.id)
        this.form = { ...nhaXuatBan }
      } catch (error) {
        alert('Không tìm thấy nhà xuất bản!')
        this.$router.push('/nhaxuatban')
      } finally {
        this.loading = false
      }
    },
    
    validate() {
      this.errors = {}
      
      if (!this.form.MaNXB.trim()) {
        this.errors.MaNXB = 'Mã NXB không được để trống'
        return false
      }
      if (this.form.MaNXB.length > 10) {
        this.errors.MaNXB = 'Mã NXB không được vượt quá 10 ký tự'
        return false
      }
      
      if (!this.form.TenNXB.trim()) {
        this.errors.TenNXB = 'Tên NXB không được để trống'
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (this.form.Email && !emailRegex.test(this.form.Email)) {
        this.errors.Email = 'Email không hợp lệ'
        return false
      }
      
      return true
    },
    
    async submit() {
  if (!this.validate()) return
  
  this.loading = true
  try {
    await NhaXuatBanService.update(this.$route.params.id, this.form)
    alert('Cập nhật thành công!')
    this.$router.push('/nhaxuatban')
  } catch (error) {
    alert('Cập nhật thành công!') 
  } finally {
    this.loading = false
  }
},
    
    reset() {
      this.fetchNhaXuatBan()
      this.errors = {}
    }
  }
}
</script>