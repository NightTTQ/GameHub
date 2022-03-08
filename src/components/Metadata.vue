<template>
  <div class="about-metadata">
    <div class="about-metadata-colum">
      <div class="metadata">
        <div class="metadata-data">
          <span class="metadata-data-title">Game Type</span>
        </div>
        <div class="metadata-data">
          <ul class="metadata-list">
            <li class="metadata-list-item">
              <span class="metadata-list-item-content">{{ gameclass }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="about-metadata-colum">
      <div class="metadata">
        <div class="metadata-data">
          <span class="metadata-data-title">Platform</span>
        </div>
        <div class="metadata-data">
          <ul class="metadata-list">
            <li class="metadata-list-item" v-for="item in platform">
              <span class="metadata-list-item-content">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  gameclass?: string;
  platform?: Array<string>;
}>();
</script>
<style scoped>
.about-metadata {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
}
.about-metadata-colum {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  flex-basis: calc(100% / 3);
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.metadata {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
.metadata-data {
  flex-basis: 100%;
  flex-grow: 0;
  flex-shrink: 1;
}
.metadata-data-title {
  transition: color 125ms ease-in-out;
  color: rgba(245, 245, 245, 0.6);
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
}
.metadata-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.metadata-list-item {
  margin-right: 0.5em;
  display: inline;
}
.metadata-list-item-content {
  transition: color 125ms ease-in-out;
  color: rgb(245, 245, 245);
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
}
@media (min-width: 1600px) {
  .metadata-data-title {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
  }
  .metadata-list-item-content {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
  }
}
</style>
