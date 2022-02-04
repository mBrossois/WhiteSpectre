<template>
  <div class="description-container" data-test="description">
    <div class="name">
      <h1 class="title">Name of picture</h1>
      <span>{{imageDescription.name}}</span>
    </div>

    <div class="author">
      <h1 class="title">Made by</h1>
      <span>{{imageDescription.author}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {CarrouselPhotoType} from "@/types/carrouselPhoto.type";

@Options({})
export default class ImageDescription extends Vue {
  @Prop() imageDescription!: CarrouselPhotoType;
}
</script>

<style scoped lang="scss">
.description-container {
  position: absolute;
  background-color: #ffffff42;
  font-family: sans-serif, Gilroy,Helvetica,Arial,sans;
  padding: 1em;
  left: 2.5em;
  bottom: 1em;
}

.description-container:hover {
  background-color: #ffffffd9;
}

@media screen and (min-width: 960px) {
  .title {
    margin: 0;
    font-size: 1.2em;
    padding-bottom: 0.2em;
  }

  .name {
    padding-bottom: 1em;
  }
}

@media screen and (max-width: 961px) {
  .title {
    margin: 0;
    font-size: 1em;
    padding-bottom: 0.2em;
  }

  .name {
    padding-bottom: 0.8em;
  }
}

</style>
