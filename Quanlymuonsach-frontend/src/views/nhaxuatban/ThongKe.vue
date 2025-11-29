<template>
  <div class="container-fluid py-4">
    <h3 class="mb-4 text-center">Thống kê số lượng sách theo Nhà Xuất Bản</h3>

    <!-- Bảng thống kê -->
    <div class="card shadow-sm mb-4">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th>Mã NXB</th>
                <th>Số lượng sách</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="2" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tải...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="stats.length === 0">
                <td colspan="2" class="text-center py-4 text-muted">
                  Chưa có dữ liệu thống kê
                </td>
              </tr>
              <tr v-else v-for="item in stats" :key="item.MaNXB">
                <td>{{ item.MaNXB }}</td>
                <td>{{ item.SoLuongSach }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="card shadow-sm">
      <div class="card-body">
        <canvas ref="nxbChart"></canvas>
      </div>
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
    const nxbChart = ref(null) // ref cho canvas

    const fetchStats = async () => {
      loading.value = true
      try {
        const data = await SachService.getStatisticsByNXB() // <-- gọi method đúng
        stats.value = data
        renderChart()
      } catch (error) {
        alert('Lỗi khi tải dữ liệu thống kê!')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const renderChart = () => {
      if (!nxbChart.value) return
      if (chartInstance.value) chartInstance.value.destroy()

      chartInstance.value = new Chart(nxbChart.value.getContext('2d'), {
        type: 'bar',
        data: {
          labels: stats.value.map(i => i.MaNXB),
          datasets: [{
            label: 'Số lượng sách',
            data: stats.value.map(i => i.SoLuongSach),
            backgroundColor: '#0d6efd'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, precision: 0 } }
        }
      })
    }

    onMounted(fetchStats)

    return { stats, loading, nxbChart }
  }
}
</script>
