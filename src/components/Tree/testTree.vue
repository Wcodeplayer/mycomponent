<template>
  <ul>
    <titleTree class="titleTree" :model="titleData"></titleTree>
  </ul>
</template>

<script>
import titleTree from "./titleTree.vue";
export default {
  name: "testTree",
  components: {
    titleTree,
  },
  data() {
    return {
      titleData: {
        title: "shouye",
        children: [
          {
            title: "ziye1",
            children: [
              {
                title: "1-1",
              },
              {
                title: "1-2",
              },
            ],
          },
          {
            title: "ziye2",
            children: [
              {
                title: "2-1",
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>