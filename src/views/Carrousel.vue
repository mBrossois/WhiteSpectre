<template>
  <logo :class="isReady() ? 'hide' : 'display'" @load-done="isInitialLoadDone = true" data-test="logo"></logo>

  <div class="container" :class="isReady() ? 'display' : 'hide'" >
    <carousel-content v-if="carrouselTypes.photos.length > 0" :items="carrouselTypes.photos" :is-loaded="isReady()" :active-carrousel-item="activeCarrouselItem" @load-images="isEverythingLoaded = true"/>

    <div class="controls" data-test="controls">
      <span class="material-icons button left" :class="activeCarrouselItem === 0 ? 'disabled' : ''" v-on:click="goPrevious()">chevron_left</span>
      <span class="material-icons button right" :class="activeCarrouselItem === carrouselTypes.photos.length - 1 ? 'disabled' : ''" v-on:click="goNext()" data-test="right-button">chevron_right</span>
    </div>

  </div>

  <span v-if="error" class="error">We couldn't load the data... <br> Try refreshing the page or check your internet connection.</span>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CarouselContent from '@/components/CarouselContent.vue';
import CarrouselService from "@/services/carrousel.service";
import {CarrouselRequestType} from "@/types/carrouselRequest.type";
import Logo from "@/components/Logo.vue"; // @ is an alias to /src

@Options({
  components: {
    CarouselContent,
    Logo
  },
})
export default class Carrousel extends Vue {
  carrouselTypes: CarrouselRequestType = {photos: []};
  activeCarrouselItem = 0;

  isInitialLoadDone = false;
  isEverythingLoaded = false;
  error = false;

  beforeCreate() {
    CarrouselService.getCarrouselItems().subscribe({
      next: (res) => {
        this.carrouselTypes = res.data;
        this.initialRouteParam();
      },
      error: (err) => {
        this.error = true;
      }
    });
  }

  isReady(): boolean {
    return (this.isEverythingLoaded && this.isInitialLoadDone);
  }

  initialRouteParam() {
    if(this.$route.params.name === undefined) {
      this.$router.push({name: 'CarouselName', params: {name: this.carrouselTypes.photos[0].name}})
      this.activeCarrouselItem = 0;
    } else {
      this.activeCarrouselItem = this.carrouselTypes.photos.findIndex((photo) => photo.name === this.$route.params.name);
    }
  }

  goPrevious() {
    this.activeCarrouselItem -= this.activeCarrouselItem > 0 ? 1 : 0;
    this.setRouteParam();
  }

  goNext() {
    this.activeCarrouselItem += this.activeCarrouselItem < this.carrouselTypes.photos.length - 1 ? 1 : 0;
    this.setRouteParam();
  }

  setRouteParam() {
    this.$router.push({name: 'CarouselName', params: {name: this.carrouselTypes.photos[this.activeCarrouselItem].name}})
  }
}
</script>

<style lang="scss">

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column-reverse;
}

.controls {
  position: absolute;
  width: 100%;
}

.material-icons.left {
  position: absolute;
  left: 0.5em;
}
.material-icons.right {
  position: absolute;
  right: 0.5em;
}

@media screen and (min-width: 961px) {
  .material-icons.button {
    transition: all 200ms ease-in-out;
    font-size: 5em;
    background-color: #ffffff42;
  }
  .material-icons.button:hover {
    background-color: #ffffffd9;
    cursor: pointer;
    font-size: 5.2em;
  }
}

@media screen and (max-width: 960px) {
  .material-icons.button {
    transition: all 200ms ease-in-out;
    font-size: 3em;
    background-color: #ffffff42;
  }
  .material-icons.button:hover {
    background-color: #ffffffd9;
    cursor: pointer;
    font-size: 3.2em;
  }
}


.material-icons.button.disabled{
  cursor: default;
  background-color: #ffffff42;
  font-size: 5em;
}

.visible {
  transition: opacity 500ms ease-in-out;
  opacity: 1;
}

.hide {
  opacity: 0;
}

.error {
  color:red;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 1.5em;
}
</style>
