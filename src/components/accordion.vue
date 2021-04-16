<template>
  <div class="accordion">
    <div id="properties" class="properties-group">
      <slot name="title"></slot>
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
  </div>
</template>

<script>
export default {
  name: 'accordion',
  data() {
    return {
      visible: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
