<script>
export default {
  props: {
    items: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    }
  }
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(item, index) in items"
      :key="item._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ item.TenSach }}
    </li>
  </ul>
</template>

<style scoped>
.list-group-item.active {
  background-color: #ffc107 !important;
  color: #000 !important;
  font-weight: bold;
}
</style>
