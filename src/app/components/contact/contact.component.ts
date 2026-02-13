import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type AnimationStage = 'idle' | 'appearing' | 'opening' | 'inserting' | 'closing' | 'flying' | 'sent';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  formData = { name: '', email: '', subject: '', message: '' };
  stage: AnimationStage = 'idle';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  async onSubmit() {
    if (this.stage !== 'idle') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      await this.sendData();
      this.stage = 'sent';
      return;
    }

    try {
      this.setStage('appearing');
      await this.wait(800);

      this.setStage('opening');
      await this.wait(800);

      await this.sendData();

      this.setStage('inserting');
      await this.wait(900);

      this.setStage('closing');
      await this.wait(800);

      this.setStage('flying');
      await this.wait(1600);

      this.setStage('sent');

    } catch (error) {
      console.error('Error:', error);
      alert('Error enviando mensaje.');
      this.fullReset();
    }
  }

  private setStage(newState: AnimationStage) {
    this.stage = newState;
    this.cdr.detectChanges();
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private sendData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('https://formspree.io/f/xjkayzoe', this.formData).subscribe({
        next: () => resolve(),
        error: (e) => reject(e)
      });
    });
  }

  fullReset() {
    this.formData = { name: '', email: '', subject: '', message: '' };
    this.setStage('idle');
  }
}
