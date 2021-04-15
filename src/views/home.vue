<template>
  <div id="home">
    <div class="properties-panel" :class="{'extended' : menuExtended}">
      <div id="properties" class="properties-group">
        <b-btn size="sm" v-if="menuExtended" class="float-right" variant="transparent" @click="menuExtended = false"><i class="fas fa-arrow-right"></i></b-btn>
        <h4>Propriétés</h4>
        <div class="content" v-if="layerSelected">
          <b-form-group>
            <b-input-group>
              <b-input-group-text>Nom</b-input-group-text>
              <b-input type="text" v-model="layerSelected.name"></b-input>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-input-group-text>Couleur</b-input-group-text>
              <b-input type="color" v-model="layerSelected.color"></b-input>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="content" v-else>
          <b-form-group>
            <b-input-group>
              <b-input-group-text>Forme de base</b-input-group-text>
              <b-select v-model="board.shape">
                <option value="circle">Cercle</option>
              </b-select>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-input-group-text>Rayon (cm)</b-input-group-text>
              <b-input type="number" min="1" max="150" step="1" v-model.number="board.radius"></b-input>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-input-group-text>Nombre de clous</b-input-group-text>
              <b-select v-model.number="board.nails">
                <option v-for="i in 999" :value="i + 1" :key="'nail-' + i">{{ i + 1 }}</option>
              </b-select>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-input-group>
              <b-input-group-text>Taille</b-input-group-text>
              <b-input type="number" min="1" max="150" step="1" v-model.number="board.width"></b-input>
              <b-input-group-text> x</b-input-group-text>
              <b-input type="number" min="1" max="150" step="1" v-model.number="board.height"></b-input>
            </b-input-group>
          </b-form-group>
        </div>
      </div>

      <div id="layers" class="properties-group">
        <h4>Couches</h4>
        <div class="content">
          <div class="layer" @click="layerSelected = null" :class="{ 'active': layerSelected === null }">
            <div class="visibility"></div>
            <div class="name">
              Board
            </div>
          </div>
          <div class="layer" v-for="(layer, index) in layers" :key="'index-' + index" @click="layerSelected = layer"
               :class="{ 'active': layerSelected === layer }">
            <div class="visibility" @click.stop="layer.visible = !layer.visible">
              <i class="fas fa-eye fa-fw" v-if="layer.visible"></i>
              <i class="fas fa-eye-slash fa-fw" v-else></i>
            </div>
            <div class="name">
              {{ layer.name }}
            </div>
            <div class="color">
              <i class="fas fa-dot-circle" :style="{color: layer.color}"></i>
            </div>
          </div>
        </div>
      </div>

      <div id="options" class="properties-group hide-sm">
        <h4>Options</h4>
        <div class="content">
          <b-form-group label="Zoom">
            <b-form-spinbutton size="sm" v-model.number="zoom" step="0.1" min="0.1" max="3"></b-form-spinbutton>
          </b-form-group>
        </div>
      </div>

      <div class="mobile-controls d-flex flex-column h-100 justify-content-end my-2">
        <b-btn size="sm" block variant="outline-white" @click="zoom > 0.1 ? zoom += 0.1 : ''"><i class="fas fa-plus"></i></b-btn>
        <b-btn size="sm" block variant="outline-white" @click="zoom < 3 ? zoom -= 0.1 : ''"><i class="fas fa-minus"></i></b-btn>
        <b-btn size="sm" block variant="outline-white" @click="menuExtended = true"><i class="fas fa-arrow-left"></i></b-btn>
      </div>
    </div>
    <main-page>
      <board :layers="layers" :zoom="zoom" :board="board"></board>
    </main-page>
  </div>
</template>

<script>
import Board from "@/components/board.vue";
import MainPage from "../components/main-page";

export default {
  name: "home",
  components: {Board, MainPage},
  data() {
    return {
      board: {
        width: 55.88,
        height: 55.88,
        nails: 320,
        radius: 25,
        resolution: 25,
        shape: `circle`
      },
      zoom: 1,
      layerSelected: false,
      layers: [],
      menuExtended: false,
      defaultPalette: [`#051f24`, `#1d758a`, `#036074`, `#5b93a3`, `#3587a3`, `#3aa1aa`, `#93cccc`, `#8eb1af`, `#88babf`
      ]
    }
  },
  mounted() {
    if (window.innerWidth < 576) {
      this.resolution = 10;
    }
    for (let i = 0; i < 9; i++) {
      this.addLayer();
    }
  },
  methods: {
    addLayer() {
      this.layers.push({
        name: `Fil ${this.layers.length}`,
        color: this.defaultPalette[this.layers.length % this.defaultPalette.length],
        visible: true
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  padding-right: 270px;

  .properties-panel {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 270px;
    height: 100%;
    flex: 1;
    background: rgba(black, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    overflow: hidden auto;

    &:not(:first-child) {
      border-top: 1px solid #333;
    }

    .properties-group {
      margin: 10px 0;
      min-height: 120px;

      h4 {
        padding: 10px;
      }

      .content {
        padding: 0 10px;
      }
    }
  }

  #properties {
    flex: 2;
    overflow: hidden auto;
  }

  .options {
    flex: 0.1;
  }

  #layers {
    flex: 2;
    width: 100%;
    display: flex;
    flex-direction: column;

    .content {
      padding: 0;
      overflow: hidden auto;
      height: 100%;
    }

    .layer {
      padding: 5px 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      justify-content: center;

      .visibility {
        margin-right: 10px;
      }

      .name {
        flex: 1;
      }

      &:hover {
        background-color: rgba(white, 0.1);
      }

      &.active {
        background-color: rgba(white, 0.07);
      }
    }

    .layer + .layer {
      border-top: 1px solid #333;
    }
  }

  .main-page {
    width: calc(100vw - 270px);
    max-height: 100vh;
    overflow: scroll;
  }

  &.draft {
    background: #ddd;

    .main-page {
      background: #fff;
      width: 216mm;
      //height: 279mm;
      padding: 13mm 18mm;
      //overflow: hidden auto;
    }
  }

  @media(min-width: 576px) {
    .mobile-controls {
      display: none !important;
    }
  }

  @media(max-width: 576px) {
    padding-right: 50px;


    .main-page {
      width: 100vw;
    }

    .properties-panel {
      &:not(.extended) {
        width: 50px;

        .properties-group {
          display: none !important;
        }
      }

      &.extended {
        position: fixed;
        width: 100%;

        .mobile-controls {
          display: none !important;
        }
      }
    }
  }
}

@media print {
  #home {
    padding: 0;

    .main-page {
      padding: 0 !important;
      overflow: visible;
    }
  }
  .properties-panel {
    display: none;
  }
}

</style>
