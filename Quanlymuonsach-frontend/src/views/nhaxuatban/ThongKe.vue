<template>
  <div class="container-fluid py-5 bg-light min-vh-100">
    <h2 class="text-center mb-5 display-6 fw-bold text-gradient">
      📊 Thống kê sách theo Nhà Xuất Bản
    </h2>

    <div class="row g-4 mb-5">
      <div 
        v-for="(item, index) in stats" 
        :key="index" 
        class="col-md-6 col-lg-4"
      >
        <div class="card shadow-lg border-0 hover-scale">
          <div class="card-header bg-gradient-primary text-white d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ item.TenNXB }}</h5>
              <small class="text-light">Mã NXB: {{ item.MaNXB }}</small>
            </div>
            <span class="badge bg-warning text-dark fs-6">{{ item.SoQuyen }} quyển</span>
          </div>
          <div class="card-body p-3">
            <p class="mb-2"><strong>Số loại sách:</strong> {{ item.SoLuongSach }}</p>
            <div class="overflow-auto" style="max-height: 120px;">
              <ul class="list-group list-group-flush">
                <li v-for="(s, idx) in item.SachList" :key="idx" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ s.TenSach }}
                  <span class="badge bg-info">{{ s.SoQuyen }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-lg p-4">
      <canvas ref="nxbLineChart" height="150"></canvas>
    </div>
  </div>
</template>

<script>
import SachService from '@/services/sach.service'
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'ThongKeNXB',
  setup() {
    const stats = ref([])
    const loading = ref(false)
    const chartInstance = ref(null)
    const nxbLineChart = ref(null)

    const fetchStats = async () => {
      loading.value = true
      try {
        stats.value = await SachService.getStatisticsByNXB()
        renderChart()
      } catch (error) {
        alert('Lỗi khi tải dữ liệu thống kê!')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const renderChart = () => {
      if (!nxbLineChart.value) return
      if (chartInstance.value) chartInstance.value.destroy()

      const ctx = nxbLineChart.value.getContext('2d')
      const gradient = ctx.createLinearGradient(0, 0, 0, 250)
      gradient.addColorStop(0, 'rgba(13, 110, 253, 0.6)')
      gradient.addColorStop(1, 'rgba(13, 110, 253, 0.1)')

      chartInstance.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stats.value.map(i => i.TenNXB),
          datasets: [{
            label: 'Số lượng sách',
            data: stats.value.map(i => i.SoLuongSach),
            fill: true,
            backgroundColor: gradient,
            borderColor: '#0d6efd',
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#0d6efd',
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const item = stats.value[context.dataIndex]
                  return `${item.TenNXB}: ${item.SoLuongSach} loại, ${item.SoQuyen} quyển`
                }
              }
            }
          },
          scales: {
            y: { beginAtZero: true, precision: 0 }
          }
        }
      })
    }

    onMounted(fetchStats)

    return { stats, loading, nxbLineChart }
  }
}
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #0d6efd, #6610f2);
}
.text-gradient {
  background: linear-gradient(90deg, #0d6efd, #6610f2, #198754);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.list-group-item {
  border: none;
  padding-left: 0;
  padding-right: 0;
}
</style>
