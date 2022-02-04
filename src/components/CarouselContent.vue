<template>
  <div v-for="item in items" :style="`transform: translateX(-${positionCarrousel}vw)`" class="carrousel-item" :key="item" ref="carrouselItems">
    <div class="image-container" :class="{zoomIn: animateZoom}">
      <image-description :image-description="item" class="image-description" :class="{'hide': animateZoom}"></image-description>
      <img v-if="!item.error" :src="item.url" @load="$emit('loadImages')" @error="onError(item)" :alt="item.name" class="carrousel-image center" ref="images">
      <span v-if="item.error" class="error">We couldn't load this image, retry later.</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {CarrouselPhotoType} from "@/types/carrouselPhoto.type";
import {Prop} from "vue-property-decorator";
import {watch} from "vue";
import {calculateImageSize} from "@/utils/imageProportions.util";
import ImageDescription from "@/components/ImageDescription.vue";

@Options({
  components: {
    ImageDescription
  }
})
export default class CarouselContent extends Vue {
  @Prop() items!: Array<CarrouselPhotoType>;
  @Prop() activeCarrouselItem!: number;
  @Prop() isLoaded!: boolean;

  $refs!: {
    carrouselItems: Array<HTMLElement>;
    images: Array<HTMLElement>
  };

  positionCarrousel = 0;
  animateZoom = false;

  beforeCreate() {
    watch(() => this.activeCarrouselItem, (newValue, oldValue) => {
      this.positionCarrousel = newValue * 100;
      this.moveCarrousel();
    })

    watch(() => this.isLoaded, (newValue, oldValue) => {
      if (newValue) {
        this.initialImageSizes()
      }
    })
  }

  mounted() {
    this.$refs.carrouselItems[0].addEventListener("transitionend", (e) => {
      if(e.propertyName === 'transform') {
        this.animateZoom = false;
        this.$refs.images.forEach(image => {
          let size = calculateImageSize(image, true);
            image.style.width = size.width + 'px';
            image.style.height = size.height + 'px';
        });
      }
    });
  }

  initialImageSizes() {
    this.$refs.images.forEach(image => {
      let size = calculateImageSize(image, true);
      image.style.width = size.width + 'px';
      image.style.height = size.height + 'px';
    });
    if(this.activeCarrouselItem !== 0) {
      this.positionCarrousel = this.activeCarrouselItem *  100;
      this.moveCarrousel();
    }
  }

  moveCarrousel() {
    this.animateZoom = true;
    this.$refs.images.forEach(image => {
      let size = calculateImageSize(image, false);
      image.style.width = size.width + 'px';
      image.style.height = size.height + 'px';
    });
  }

  onError(image: CarrouselPhotoType) {
    image.error = true;
    this.$emit('loadImages');
  }
}
</script>

<style scoped lang="scss">
.carrousel-item {
  transition: all 350ms ease-in-out 450ms;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container {
  transition: all ease-in-out 350ms;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container.zoomIn {
  height: 50vh;
  width: 40vw;
}

.carrousel-image {
  transition: all 350ms ease-in-out;
}

.image-description {
  transition: all 150ms ease-in-out 350ms;
  opacity: 1;
}

.image-description.hide {
  transition: all ease-in-out 150ms;
  opacity: 0;
}

.error {
  bottom: 50%;
  top: 50%;
  transform: translate(-50%, -50%);


}

</style>
