<template>
  <aside class="aside">
    <div class="aside-content">
      <div class="cover-div" :style="coverURL"></div>
      <div class="aside-el" v-for="item in links">
        <a :href="item.url" target="_blank">
          <button class="link-btn">
            <span class="link-text">
              <span>{{ item.name }}</span>
            </span>
          </button>
        </a>
      </div>
      <div class="aside-el">
        <div class="aside-metadata">
          <div class="aside-metadata-el">
            <div class="metadata-layout">
              <span class="metadata-name">Author</span>
              <span class="metadata-content">{{ author?.name }}</span>
            </div>
          </div>
          <div class="aside-metadata-el">
            <div class="metadata-layout">
              <span class="metadata-name">CreatedTime</span>
              <span class="metadata-content">
                {{ new Date(String(props.createdAt)).toLocaleDateString() }}
              </span>
            </div>
          </div>
          <div class="aside-metadata-el">
            <div class="metadata-layout">
              <span class="metadata-name">UpdatedTime</span>
              <span class="metadata-content">
                {{ new Date(String(props.updatedAt)).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";

const props = defineProps<{
  links?: Array<Link>;
  cover?: string;
  author?: Author;
  createdAt?: String;
  updatedAt?: String;
}>();
interface Link {
  name: string;
  url: string;
}
interface Author {
  name: string;
  type: number;
  url: string;
}

const coverURL: ComputedRef<string> = computed(
  () => "background-image: url(" + props.cover + ")"
);
</script>

<style scoped>
a {
  text-decoration: none;
}
.cover-div {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 0%;
  padding-top: calc(9 / 16 * 100%);
}
.aside-el {
  margin-top: 10px;
}
.link-btn {
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: bold;
  position: relative;
  border-radius: 4px;
  text-transform: uppercase;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 15px;
  padding: 0 20px;
  height: 50px;
  display: flex;
  width: 100%;
  min-width: auto;
  background-color: red;
  color: white;
}
.link-btn::before {
  transition: border 125ms ease-in-out;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: inherit;
}
.link-btn:focus::before {
  border: 1px solid #fff;
}
.link-btn::after {
  transition: opacity 200ms ease;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  opacity: 0;
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.link-btn:hover::after {
  opacity: 0.16;
  overflow: hidden;
}
.link-text {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 12em;
}
.aside-metadata {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.aside-metadata-el {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.metadata-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.metadata-name {
  transition: color 125ms ease-in-out;
  color: rgba(245, 245, 245, 0.6);
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
}
.metadata-content {
  transition: color 125ms ease-in-out;
  color: rgb(245, 245, 245);
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
}
@media (min-width: 768px) {
  .aside-content {
    position: sticky;
    top: 90px;
  }
}
@media (min-width: 1280px) {
  .aside {
    margin-left: 64px;
    width: 320px;
  }
}
@media (min-width: 1600px) {
  .link-btn {
    font-size: 14px;
    letter-spacing: 1px;
  }
  .metadata-name {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
  }
  .metadata-content {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
  }
}
</style>
