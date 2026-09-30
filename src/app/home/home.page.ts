import { Component, ElementRef, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('cameraInput') cameraInput?: ElementRef<HTMLInputElement>;
  @ViewChild('videoPreview') videoPreview?: ElementRef<HTMLVideoElement>;

  photo: string | undefined;
  cameraActive = false;
  stream?: MediaStream;

  constructor() {}

  private isNativeCapacitor(): boolean {
    return !!(window as any).Capacitor?.isNativePlatform?.();
  }

  async abrirCamara() {
    if (this.isNativeCapacitor()) {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
        });

        this.photo = image.dataUrl;
        return;
      } catch (error) {
        console.error('No se pudo abrir la cámara nativa', error);
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });

        this.cameraActive = true;

        setTimeout(() => {
          if (this.videoPreview) {
            this.videoPreview.nativeElement.srcObject = this.stream ?? null;
            this.videoPreview.nativeElement.play();
          }
        });

        return;
      } catch (error) {
        console.warn('Webcam no disponible, usando selector de archivos', error);
      }
    }

    this.cameraInput?.nativeElement.click();
  }

  capturarDesdeWebcam() {
    const video = this.videoPreview?.nativeElement;
    if (!video) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.photo = canvas.toDataURL('image/png');
    this.cerrarCamara();
  }

  cerrarCamara() {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    this.cameraActive = false;
  }

  async abrirGaleria() {
    if (this.isNativeCapacitor()) {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Photos,
        });

        this.photo = image.dataUrl;
        return;
      } catch (error) {
        console.error('No se pudo abrir la galería nativa', error);
      }
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (event: Event) => this.onFileSelected(event);
    input.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
