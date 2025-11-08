<template>
  <div class="card card-body border-primary">
    <div v-for="(value, key) in item" :key="key">
      <b>{{ key }}:</b> {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCard",
  props: {
    item: { type: Object, required: true },
  },
};
</script>
