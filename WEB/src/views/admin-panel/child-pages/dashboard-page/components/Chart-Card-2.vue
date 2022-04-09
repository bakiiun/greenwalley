<template>
  <v-card class="mt-5 mx-4" min-width="300">
    <div class="d-flex justify-space-between">
      <v-subheader class="text-h5 font-weight-bold"> {{ data.title }} </v-subheader>
      <v-sheet class="v-sheet--offset justify-center" rounded="lg" color="cyan" elevation="12" max-width="70">
        <v-icon size="65">{{ data.ico }}</v-icon>
      </v-sheet>
    </div>

    <v-card-text class="mt-n10">
      <div class="text-body-1 font-weight-light mb-2">{{ data.value }}</div>
      <v-divider class="my-2"></v-divider>
      <div class="text-end">
        <v-icon class="mr-2" small> mdi-backup-restore </v-icon>
        <span class="text-caption grey--text font-weight-light">{{ data.oldValue }} </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style>
.v-sheet--offset {
  top: -15px;
  right: -15px;
  position: relative;
}
</style>
