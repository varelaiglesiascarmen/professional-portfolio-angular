import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lenguage-selector.component.html',
  styleUrl: './lenguage-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {
  isVisible = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const langSet = localStorage.getItem('user_language');
      if (langSet) {
        this.isVisible.set(false);
      } else {
        this.isVisible.set(true);
      }
    }
  }

  selectLanguage(langCode: string) {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('user_language', langCode);

    if (langCode === 'es') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      location.reload();
      return;
    }

    const cookieValue = `/es/${langCode}`;

    document.cookie = `googtrans=${cookieValue}; path=/`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=localhost`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.localhost`;

    const googleSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleSelect) {
      googleSelect.value = langCode;
      googleSelect.dispatchEvent(new Event('change'));
    }

    this.isVisible.set(false);

    setTimeout(() => {
      location.reload();
    }, 150);
  }
}
}
