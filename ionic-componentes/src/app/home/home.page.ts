import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isModalOpen = false;
  isDarkMode = false;
  progress = 0.68;
  selectedSegment = 'componentes';
  selectedFruit = 'manzana';
  notificationsEnabled = true;
  termsAccepted = true;

  constructor(
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
  ) {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: '¿Guardar cambios?',
      message: 'Este es un ion-alert con acciones y contenido personalizado.',
      buttons: ['Cancelar', { text: 'Guardar', role: 'confirm', handler: () => this.showToast('Cambios guardados') }],
    });
    await alert.present();
  }

  async showActions() {
    const sheet = await this.actionSheetController.create({
      header: 'Acciones del componente',
      buttons: [
        { text: 'Compartir', icon: 'share-outline' },
        { text: 'Duplicar', icon: 'copy-outline' },
        { text: 'Eliminar', role: 'destructive', icon: 'trash-outline' },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2200, position: 'bottom', buttons: [{ text: 'OK', role: 'cancel' }] });
    await toast.present();
  }

  toggleTheme(event: CustomEvent) {
    this.isDarkMode = event.detail.checked;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  updateProgress(value: number | { lower: number; upper: number }) {
    this.progress = typeof value === 'number' ? value : value.lower;
  }

}
