import { ipcRenderer } from 'electron';
import { Track } from 'src/types';

export interface IApp {
  onLogEvent(callback: (message: string | object) => void): void;
  onMusicList(callback: (list: Track[]) => void): void;
  onStartDownload(callback: () => void): void;
  onDownloadProgress(callback: (id: string, progress: number) => void): void;
}

const app: IApp = {
  onLogEvent: function (callback: (message: string | object) => void): void {
    ipcRenderer.on('log-event', (_event, message) => {
      callback(message);
    });
  },
  onMusicList: function (callback: (list: Track[]) => void): void {
    ipcRenderer.on('music-list', (_event, list) => {
      callback(list);
    });
  },
  onStartDownload: function (callback: () => void): void {
    ipcRenderer.on('start-download', () => {
      callback();
    });
  },
  onDownloadProgress: function (
    callback: (id: string, progress: number) => void
  ): void {
    ipcRenderer.on('download-progress', (_event, id, progress) => {
      callback(id, progress);
    });
  },
};

export default app;
