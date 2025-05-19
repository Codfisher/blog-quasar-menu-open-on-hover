<template>
  <div class="flex gap-10 p-10">
    <div class="p-4 bg-primary text-white rounded cursor-pointer">
      Menu

      <menu-hover>
        <q-list
          dense
          style="min-width: 100px"
        >
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>Open...</q-item-section>
          </q-item>
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>New</q-item-section>
          </q-item>
          <q-separator />
          <q-item
            v-for="j in 2"
            :key="j"
            clickable
          >
            <q-item-section>Preferences</q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>

            <menu-hover
              anchor="top end"
              self="top start"
            >
              <q-list>
                <q-item
                  v-for="n in 3"
                  :key="n"
                  dense
                  clickable
                >
                  <q-item-section>
                    Submenu Label {{ j === 1 ? '（disableHover）' : '' }}
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <menu-hover
                    auto-close
                    anchor="top end"
                    self="top start"
                    :disable-hover-open="j === 1"
                  >
                    <q-list>
                      <q-item
                        v-for="n in 1"
                        :key="n"
                        dense
                        clickable
                      >
                        <q-item-section>
                          3rd level Label
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </menu-hover>
                </q-item>
              </q-list>
            </menu-hover>
          </q-item>
          <q-separator />
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>Quit</q-item-section>
          </q-item>
        </q-list>
      </menu-hover>
    </div>

    <q-btn
      label="Menu"
      color="primary"
      unelevated
    >
      <q-menu>
        <q-list
          dense
          style="min-width: 100px"
        >
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>Open...</q-item-section>
          </q-item>
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>New</q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable>
            <q-item-section>Preferences</q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>

            <q-menu
              anchor="top end"
              self="top start"
            >
              <q-list>
                <q-item
                  v-for="n in 3"
                  :key="n"
                  dense
                  clickable
                >
                  <q-item-section>Submenu Label</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-menu
                    auto-close
                    anchor="top end"
                    self="top start"
                  >
                    <q-list>
                      <q-item
                        v-for="n in 3"
                        :key="n"
                        dense
                        clickable
                      >
                        <q-item-section>3rd level Label</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-separator />
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>Quit</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import MenuHover from '../components/menu-hover/menu-hover.vue'
</script>

<style scoped lang="sass">
</style>
