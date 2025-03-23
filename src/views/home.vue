<template>
  <div id="home">
    <b-navbar class="main-menu" variant="dark" fixed="top">
      <b-btn variant="transparent" v-if="isMobile"
             @click="$store.state.mobilePropertiesExtended = !$store.state.mobilePropertiesExtended">
        <i class="fas fa-bars"></i>
      </b-btn>
      <template v-if="project">
        <b-dropdown text="Menu" no-caret>
          <b-dropdown-item @click="newProject">Nouveau</b-dropdown-item>
          <!--                <b-dropdown-item @click="project.open">Ouvrir</b-dropdown-item>-->
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="saveOrSaveAs">Enregistrer</b-dropdown-item>
          <b-dropdown-item @click="saveAs">Enregistrer Sous</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="print"><i class="fas fa-print"></i> Imprimer</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="closeProject">Fermer le projet</b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-if="!isMobile && !isMobileLandscape" text="Affichage" no-caret>
          <b-dropdown-item @click="$store.state.settings.showMargins = !$store.state.settings.showMargins">
            <b-checkbox :checked="$store.state.settings.showMargins">Afficher les marges</b-checkbox>
          </b-dropdown-item>
          <b-dropdown-item @click="$store.state.settings.showCenter = !$store.state.settings.showCenter">
            <b-checkbox :checked="$store.state.settings.showCenter">Afficher le centre</b-checkbox>
          </b-dropdown-item>
          <b-dropdown-item @click="$store.state.settings.middleLines = !$store.state.settings.middleLines">
            <b-checkbox :checked="$store.state.settings.middleLines">Afficher repère central</b-checkbox>
          </b-dropdown-item>
          <b-dropdown-item @click="$store.state.settings.diagonalLines = !$store.state.settings.diagonalLines">
            <b-checkbox :checked="$store.state.settings.diagonalLines">Afficher lignes diagonale</b-checkbox>
          </b-dropdown-item>
          <b-dropdown-item @click="$store.state.settings.nailNumbers = !$store.state.settings.nailNumbers">
            <b-checkbox :checked="$store.state.settings.nailNumbers">Afficher le numéro des clous</b-checkbox>
          </b-dropdown-item>
          <b-dropdown-item @click="$store.state.settings.printMode = !$store.state.settings.printMode">
            <b-checkbox :checked="$store.state.settings.printMode">Mode d'impression</b-checkbox>
          </b-dropdown-item>
        </b-dropdown>
        <b-btn variant="transparent" @click.stop="saveOrSaveAs"><i class="fas fa-save"></i></b-btn>
        <b-btn variant="transparent" disabled @click.stop=""><i class="fas fa-undo"></i></b-btn>
        <b-btn variant="transparent" disabled @click.stop=""><i class="fas fa-redo"></i></b-btn>
        <div class="separator"></div>
        <b-btn variant="transparent" @click.stop="setZoom(-.1)"><i class="fas fa-search-minus"></i></b-btn>
        <div class="zoom">{{ Math.round(zoom * 100) }}%</div>
        <b-btn variant="transparent" @click.stop="setZoom(.1)"><i class="fas fa-search-plus"></i></b-btn>

        <template v-if="!isMobile">
          <div class="separator"></div>
          <b-input v-if="project" class="project-name" v-model="project.name"></b-input>
        </template>
      </template>

      <template v-if="!isMobile">
        <b-navbar-brand class="ml-auto">String Art Generator</b-navbar-brand>
      </template>
    </b-navbar>
    <template v-if="project">
      <properties-panel v-model="layerSelected"></properties-panel>
      <main-page @wheel="onWheelChanged">
        <board ref="board" :zoom="zoom" @nail-selected="onNailSelected" :layer-selected="layerSelected"></board>
      </main-page>
    </template>
    <template v-else>
      <div class="welcome-screen">
        <b-container>
          <template v-if="!isMobile">
            <h5 class="">String Art Generator v0.2</h5>
            <hr>
          </template>
          <div class="buttons">
            <h4 class="text-center">Bienvenue Arianne</h4>
            <b-btn block @click="newProject" variant="primary">Nouveau projet</b-btn>
          </div>
          <div class="previous-projects">
            <h4 class="text-center">Projets récents</h4>
            <div class="project-list" v-if="previousProjects && previousProjects.length > 0">
              <div @click="openProject(project)" class="project" v-for="project in previousProjects" :key="project.id">
                <div class="date">{{ project.date_creation|date }}</div>
                <div class="name">{{ project.name }}</div>
              </div>
            </div>
            <template v-else>
              <p class="empty text-center">Pas encore de projets récents...</p>
            </template>
          </div>
        </b-container>
        <!--                        <b-img :src="require('../assets/img/home.jpg')"></b-img>-->
      </div>
    </template>
  </div>
</template>

<script>
import Board from "@/components/board.vue";
import PropertiesPanel from "@/components/properties-panel.vue";
import Project from "@/helpers/Project.js";
import MainPage from "../components/main-page";
import swal from 'sweetalert2'

export default {
  name: "home",
  components: {PropertiesPanel, Board, MainPage},
  data() {
    return {
      zoom: 0.4,
      showPreviousSessionModal: false,
      previousProjectName: '',
      layerSelected: false,
      menuExtended: false,
      previousProjects: []
    }
  },
  mounted() {
    this.loadRecentProjects();
  },
  methods: {
    onNailSelected(nail) {
      if (nail && this.recordLayerPattern && this.layerSelected) {
        this.layerSelected.patternSteps.push({
          nail: nail.index,
          delta: 0
        });
        this.$refs.board.refreshScreenAndOverlay();
      }
    },
    onWheelChanged(evt) {
      if (!evt.ctrlKey) {
        return true;
      }
      if (evt.deltaY > 0) {
        this.setZoom(-0.1);
      } else {
        this.setZoom(0.1);
      }
      evt.preventDefault();
    },
    loadRecentProjects() {
      let projects = localStorage.getItem('projects');
      if (projects) {
        projects = JSON.parse(projects);
        this.previousProjects = projects;
      }
    },
    async askSaveConfirmationBefore() {
      if (this.project) {
        const result = await swal.fire({
          title: "Enregistrer avant ?",
          text: `Voulez-vous enregistrer ${this.project.name} avant ?`,
          showCancelButton: true,
          showDenyButton: true,
          showCloseButton: true,
          cancelButtonText: `Annuler`,
          denyButtonText: `Ne pas enregistrer`,
          confirmButtonText: `Enregistrer`
        });
        if (result.isConfirmed) {
          await this.saveOrSaveAs();
          return true;
        } else if (result.isDismissed) {
          return false;
        }
      } else {
        return true;
      }
    },
    async newProject() {
      let result = await this.askSaveConfirmationBefore();
      if (result === false) {
        return;
      }
      this.project = new Project();

      // Super carré
      this.project.board.shape = `rectangle`;
      this.project.board.marginX = 20;// to display borders around
      this.project.board.marginY = 20;// to display borders around
      this.project.board.width = 260;
      this.project.board.height = 260;

      this.project.addNailsLayer({
        nails: {
          quantity: 23
        },
        line: {
          start: {
            x: this.project.board.marginX,
            y: this.project.board.height - this.project.board.marginY
          },
          end: {
            x: this.project.board.marginX,
            y: this.project.board.marginY
          },
          includesEndNail: true
        }
      });
      this.project.addNailsLayer({
        nails: {
          quantity: 23
        },
        line: {
          start: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.height - this.project.board.marginY
          },
          end: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.marginY
          },
          includesEndNail: true
        }
      });
      this.project.addNailsLayer({
        nails: {
          quantity: 23
        },
        line: {
          start: {
            x: this.project.board.width / 2,
            y: this.project.board.height - this.project.board.marginY
          },
          end: {
            x: this.project.board.width / 2,
            y: this.project.board.marginY
          },
          includesEndNail: true
        }
      });

      // Ligne Haut Gauche = 10 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 12
        },
        line: {
          start: {
            x: this.project.board.marginX,
            y: this.project.board.marginY
          },
          end: {
            x: this.project.board.width / 2,
            y: this.project.board.marginY
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Haut Droite = 10 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 12
        },
        line: {
          start: {
            x: this.project.board.width / 2,
            y: this.project.board.marginY
          },
          end: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.marginY
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Milieu Droite = 10 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 12
        },
        line: {
          start: {
            x: this.project.board.width / 2,
            y: this.project.board.height / 2,
          },
          end: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.height / 2,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Milieu Gauche = 10 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 12
        },
        line: {
          start: {
            x: this.project.board.marginX,
            y: this.project.board.height / 2,
          },
          end: {
            x: this.project.board.width / 2,
            y: this.project.board.height / 2,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Bas Gauche = 10 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 12
        },
        line: {
          start: {
            x: this.project.board.marginX,
            y: this.project.board.height - this.project.board.marginY,
          },
          end: {
            x: this.project.board.width / 2,
            y: this.project.board.height - this.project.board.marginY,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Bas Droite = 10 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 12
        },
        line: {
          start: {
            x: this.project.board.width / 2,
            y: this.project.board.height - this.project.board.marginY,
          },
          end: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.height - this.project.board.marginY,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Diagonale Haut Droite = 14 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 16
        },
        line: {
          start: {
            x: this.project.board.width / 2,
            y: this.project.board.marginY
          },
          end: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.height / 2,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Diagonale Bas Droite = 14 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 16
        },
        line: {
          start: {
            x: this.project.board.width - this.project.board.marginX,
            y: this.project.board.height / 2,

          },
          end: {
            x: this.project.board.width / 2,
            y: this.project.board.height - this.project.board.marginY,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Diagonale Bas Gauche = 14 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 16
        },
        line: {
          start: {
            x: this.project.board.width / 2,
            y: this.project.board.height - this.project.board.marginY,

          },
          end: {
            x: this.project.board.marginX,
            y: this.project.board.height / 2,
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

      // Ligne Diagonale Haut Gauche = 14 clous
      this.project.addNailsLayer({
        nails: {
          quantity: 16
        },
        line: {
          start: {
            x: this.project.board.marginX,
            y: this.project.board.height / 2,

          },
          end: {
            x: this.project.board.width / 2,
            y: this.project.board.marginY
          },
          includesStartNail: false,
          includesEndNail: false
        }
      });

        this.project.addLayer({
          type: `custom`,
          patternSteps: [
            {layer: 0, nail: 0, delta: 1},
            {layer: 7, nail: 0, delta: 1}
          ]
        });

      //Hardcodé le pattern rectangle
      // this.project.stringLayers[0].settings.startingNail = 47;
      // this.project.stringLayers[0].settings.loopCount = 64;

      // this.project.nailsLayers[0].settings.nails.quantity = 23;
      // this.project.nailsLayers[0].settings.line = {
      //   start: {
      //     x: this.project.board.marginX,
      //     y: this.project.board.height - this.project.board.marginY
      //   },
      //   end: {
      //     x: this.project.board.marginX,
      //     y: this.project.board.marginY
      //   },
      //   includesEndNail: true
      // }
      // for (let layer of this.project.nailsLayers) {
      //   layer.generateNails();
      // }

      /**
       * Rectangle en Z
       this.project.board.shape = `rectangle`;
       this.project.board.marginX = 10;// to display borders around
       this.project.board.marginY = 5;// to display borders around
       this.project.board.width = 360;
       this.project.board.height = 180;

       this.project.nailsLayers[0].settings.nails.quantity = 34;
       this.project.nailsLayers[0].settings.line = {
              start: {
                x: this.project.board.marginX,
                y: this.project.board.height - this.project.board.marginY
              },
              end: {
                x: this.project.board.marginX,
                y: this.project.board.marginY
              },
              includesEndNail: false
            }

       this.project.addNailsLayer();
       this.project.nailsLayers[1].settings.nails.quantity = 76;
       this.project.nailsLayers[1].settings.line = {
            start: {
              x: this.project.board.marginX,
              y: this.project.board.marginY
            },
            end: {
              x: this.project.board.width - this.project.board.marginX,
              y: this.project.board.height - this.project.board.marginY
            },
            includesEndNail: true
          }

       this.project.addNailsLayer();
       this.project.nailsLayers[2].settings.nails.quantity = 34;
       this.project.nailsLayers[2].settings.line = {
              start: {
                x: this.project.board.width - this.project.board.marginX,
                y: this.project.board.marginY
              },
              end: {
                x: this.project.board.width - this.project.board.marginX,
                y: this.project.board.height - this.project.board.marginY
              },
              includesEndNail: false
            }

       for (let i = 0; i < 3; i++) {
            this.project.nailsLayers[i].generateNails();
          }
       for (let i = 0; i < 6; i++) {
            this.project.addLayer();
          }
       //Hardcodé le pattern rectangle
       this.project.stringLayers[0].settings.startingNail = 0;
       this.project.stringLayers[0].settings.loopCount = 35;
       this.project.stringLayers[1].settings.startingNail = 13;
       this.project.stringLayers[1].settings.loopCount = 22;
       this.project.stringLayers[2].settings.startingNail = 9;
       this.project.stringLayers[2].settings.loopCount = 21;
       this.project.stringLayers[3].settings.startingNail = 3;
       this.project.stringLayers[3].settings.loopCount = 21;
       this.project.stringLayers[4].settings.startingNail = 0;
       this.project.stringLayers[4].settings.loopCount = 20;
       this.project.stringLayers[5].settings.startingNail = 0;
       this.project.stringLayers[5].settings.loopCount = 10;
       **/
    },
    openProject(project) {
      this.project = new Project();
      this.project.open(project.id);
    },
    async saveAs() {
      const {value: newName} = await swal.fire({
        title: "Nom du projet",
        input: "text",
        inputValue: this.project.name,
        showCancelButton: true,
        showCloseButton: true,
        cancelButtonText: `Annuler`
      });
      if (newName) {
        this.project.saveAs(newName);
        this.$bvToast.toast(`${this.project.name} a été enregistré avec succès`, {
          title: 'Enregistré',
          autoHideDelay: 5000
        });
      }
    },
    async saveOrSaveAs() {
      if (this.project.saved) {
        this.project.save();
        this.$bvToast.toast(`${this.project.name} a été enregistré avec succès`, {
          title: 'Enregistré',
          autoHideDelay: 5000
        });
      } else {
        await this.saveAs();
      }
    },
    async closeProject() {
      let result = await this.askSaveConfirmationBefore();
      if (result === false) {
        return;
      }
      this.project = null;
      this.loadRecentProjects();
    },
    print() {
      if (this.projectSettings.printMode) {
        this.$store.state.settings.showCenter = false;
        this.$store.state.settings.middleLines = false;
        this.$store.state.settings.diagonalLines = false;
        this.$store.state.settings.nailNumbers = false;
        this.$store.state.settings.printMode = false;
      } else {
        this.$store.state.settings.showCenter = true;
        this.$store.state.settings.middleLines = true;
        this.$store.state.settings.diagonalLines = true;
        this.$store.state.settings.nailNumbers = true;
        this.$store.state.settings.printMode = true;
      }
    },
    setZoom(delta) {
      this.zoom = Math.max(Math.min(this.zoom + delta, 3), 0.1);
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  padding-right: 270px;

  .navbar.main-menu {
    background: rgba(#374145, 0.85) !important;
    backdrop-filter: blur(5px);
    color: white;
    padding: 0 10px;
    height: 40px !important;

    .navbar-brand {
      margin: 0 15px 0 0;
      color: inherit;
    }

    .separator {
      display: inline-block;
      height: 20px;
      margin: 0 2px;
      border-right: 3px solid rgba(white, 0.2);
    }

    .dropdown ::v-deep {
      .btn.dropdown-toggle {
        background: none;
        color: rgba(white, 0.8);
        height: 40px;
        border-radius: 0;
        border: none;
        font-weight: 400;

        &:hover {
          color: white;
          background-color: #3096cf;
        }
      }
    }

    .form-control {
      display: inline-block;
      width: auto;
      background: none;
      border: none;
      box-shadow: none;
      color: white;
      border-radius: 0;
      height: 30px;

      &:hover {
        background-color: rgba(white, 0.1);
      }

      &:focus {
        background-color: #2d3539;
      }
    }

    .zoom {
      padding: 5px;
      font-size: 10pt;
      opacity: 0.7;
    }

    .btn {
      color: rgba(white, 0.8);
      height: 40px;
      border-radius: 0;

      &:hover {
        color: white;
        background-color: #3096cf;
      }
    }
  }

  .welcome-screen {
    display: flex;
    margin: 70px 0 0 270px;
    overflow: hidden;

    .buttons {
      display: inline-block;
      width: 200px;
      vertical-align: top;
    }

    .previous-projects {
      display: inline-block;
      vertical-align: top;
      margin-left: 30px;
      width: calc(100% - 230px);
      max-width: 500px;

      .project-list {
        width: 100%;
        background-color: #374145;
        border-radius: 4px;
        overflow: hidden auto;
      }

      .project {
        padding: 10px 15px;
        text-align: left;
        cursor: pointer;
        display: block;

        .name {
          font-weight: 500;
        }

        .date {
          float: right;
          font-weight: 400;
          opacity: 0.7;
        }

        &:hover {
          background-color: #3096cf;
        }

        &.project {
          border-top: 1px solid rgba(black, 0.2);
        }
      }

      .empty {
        margin: 20px;
        opacity: 0.7;
        font-style: italic;
        font-size: 11pt;
      }
    }
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

  @media(max-width: 576px), (max-height: 576px) {
    padding-right: 0;

    .navbar.main-menu {
      padding: 0;
    }

    .welcome-screen {
      display: flex;
      margin: 60px 0 0 0;
      overflow-x: hidden;
      overflow-y: hidden;

      .buttons {
        display: block;
        width: 100%;
      }

      .previous-projects {
        display: block;
        margin: 20px 0 0 0;
        width: 100%;
        max-width: initial;
      }
    }
  }
}

</style>
