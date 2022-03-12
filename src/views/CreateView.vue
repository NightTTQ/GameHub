<template>
  <div class="view-page">
    <div class="view-page-content">
      <el-card body-style="display: flex;">
        <template #header>
          <div class="card-header">
            <span class="title">Create new game</span>
          </div>
        </template>
        <div class="detail-row">
          <div class="detail-col">123</div>
          <div class="detail-col">123</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.view-page {
  width: 75%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}
.view-page-content {
  padding-top: 5%;
  padding-bottom: 90px;
  color: white;
}
.el-card {
  color: white;
  border: none;
  width: 100%;
  background-color: rgb(42, 42, 42);
}
* {
  --el-card-border-color: rgba(255, 255, 255, 0.12);
}
.card-header {
  display: flex;
}
.title {
  font-size: large;
}
.detail-row {
  display: flex;
  flex-direction: column;
}
.detail-col {
  display: flex;
  flex-direction: row;
}
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
</style>
