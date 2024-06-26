<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useLoggerStore } from './stores/logger';
import { useTrackStore } from './stores/track';
import { useSettingsStore } from './stores/settings';

export default defineComponent({
  name: 'App',
  setup() {
    const logger = useLoggerStore();
    const track = useTrackStore();
    const settings = useSettingsStore();
    const $q = useQuasar();
    $q.dark.set(true);

    onMounted(async () => {
      /**
       * Populate Store with persisted settings
       */
      settings.setSettings(await window.settings.load());

      window.app.onLogEvent((message) => {
        logger.addLog(message);
      });

      window.app.onMusicList((musicList) => {
        track.addTracks(musicList);
      });

      window.app.onStartDownload(() => {
        track.setDownloading();
      });

      window.app.onDownloadProgress((itemId, progress) => {
        track.changeProgress(itemId, progress);
      });

      window.app.onFilePath((itemId, filePath) => {
        track.setFilePath(itemId, filePath);
      });
    });

    return {
      logger,
      track,
    };
  },
});
</script>
