<template>
  <form @submit.prevent="submit" novalidate>
    <div class="row g-4">
      <div class="col-md-6">
        <label class="form-label fw-semibold text-dark">Mã NXB <span class="text-danger">*</span></label>
        <input 
          type="text" 
          v-model="local.MaNXB" 
          class="form-control form-control-lg" 
          :class="{ 'is-invalid': error.MaNXB }"
          required 
          maxlength="10"
          placeholder="VD: NXB001"
        >
        <div v-if="error.MaNXB" class="invalid-feedback">
          {{ error.MaNXB }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label fw-semibold text-dark">Tên NXB <span class="text-danger">*</span></label>
        <input 
          type="text" 
          v-model="local.TenNXB" 
          class="form-control form-control-lg" 
          :class="{ 'is-invalid': error.TenNXB }"
          required 
          placeholder="VD: Nhà xuất bản Giáo dục"
        >
        <div v-if="error.TenNXB" class="invalid-feedback">
          {{ error.TenNXB }}
        </div>
      </div>
    </div>

    <div class="row g-4 mt-4">
      <div class="col-md-6">
        <label class="form-label fw-semibold text-dark">Địa chỉ</label>
        <input 
          type="text" 
          v-model="local.DiaChi" 
          class="form-control"
          placeholder="VD: 123 Đường ABC, Quận 1, TP.HCM"
        >
      </div>

      <div class="col-md-6">
        <label class="form-label fw-semibold text-dark">Số điện thoại</label>
        <input 
          type="tel" 
          v-model="local.SoDienThoai" 
          class="form-control"
          placeholder="VD: 0123456789"
        >
      </div>
    </div>

    <div class="row g-4 mt-4">
      <div class="col-12">
        <label class="form-label fw-semibold text-dark">Email</label>
        <input 
          type="email" 
          v-model="local.Email" 
          class="form-control"
          :class="{ 'is-invalid': error.Email }"
          placeholder="VD: info@nxb.com"
        >
        <div v-if="error.Email" class="invalid-feedback">
          {{ error.Email }}
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
      <button 
        type="button" 
        class="btn btn-outline-secondary btn-lg px-4"
        @click="resetForm"
      >
        <i class="fas fa-undo-alt me-2"></i>Reset
      </button>
      <button 
        type="submit" 
        class="btn btn-success btn-lg px-5"
        :disabled="isSubmitting || !isValid"
      >
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
        <i v-else :class="isEdit ? 'fas fa-edit' : 'fas fa-plus' " class="me-2"></i>
        {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "NhaXuatBanForm",
  props: {
    nxb: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      local: {
        MaNXB: '',
        TenNXB: '',
        DiaChi: '',
        SoDienThoai: '',
        Email: ''
      },
      error: {
        MaNXB: '',
        TenNXB: '',
        Email: ''
      },
      isSubmitting: false
    };
  },
  emits: ["submit:nxb", "reset"],
  computed: {
    isEdit() {
      return !!this.nxb._id;
    },
    isValid() {
      return this.local.MaNXB.trim() && this.local.TenNXB.trim();
    }
  },
  watch: {
    nxb: {
      handler(newVal) {
        this.local = { ...newVal };
        this.clearErrors();
      },
      deep: true,
      immediate: true
    },
    loading(newVal) {
      this.isSubmitting = newVal;
    }
  },
  methods: {
    submit() {
      this.clearErrors();
      const errors = this.validate();
      
      if (Object.values(errors).some(error => error)) {
        return;
      }

      this.$emit("submit:nxb", { ...this.local });
    },

    validate() {
      if (!this.local.MaNXB.trim()) {
        this.error.MaNXB = 'Mã NXB không được để trống';
        return this.error;
      } 
      if (this.local.MaNXB.length > 10) {
        this.error.MaNXB = 'Mã NXB không được vượt quá 10 ký tự';
        return this.error;
      } 
      this.error.MaNXB = '';

      if (!this.local.TenNXB.trim()) {
        this.error.TenNXB = 'Tên NXB không được để trống';
        return this.error;
      }
      this.error.TenNXB = '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.local.Email && !emailRegex.test(this.local.Email)) {
        this.error.Email = 'Email không hợp lệ';
        return this.error;
      }
      this.error.Email = '';

      return this.error;
    },

    clearErrors() {
      this.error = {
        MaNXB: '',
        TenNXB: '',
        Email: ''
      };
    },

    resetForm() {
      this.local = {
        MaNXB: '',
        TenNXB: '',
        DiaChi: '',
        SoDienThoai: '',
        Email: ''
      };
      this.clearErrors();
      this.$emit('reset');
    }
  }
};
</script>

<style scoped>
.form-label {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #e9ecef;
  transition: all 0.2s ease-in-out;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.form-control.is-invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.75rem + 2px) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.invalid-feedback {
  font-size: 0.875rem;
  font-weight: 500;
}

.btn {
  border-radius: 0.5rem;
  font-weight: 600;
  padding: 0.625rem 1.5rem;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.border-top {
  border-top: 1px solid #e9ecef !important;
}
</style>