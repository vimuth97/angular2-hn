import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../shared/services/settings.service';
import { Settings } from '../../shared/models/settings';
import { SpeechService } from 'src/app/shared/services/speech-service/speech.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  settings: Settings;

  constructor(
    private _settingsService: SettingsService,
    private _speechService : SpeechService
    ) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {
    let tagNames = ['a'];// 'h2', 'h3', 'label', 'button'
    this.addEventListenersToElements(tagNames)
  }

  toggleSettings() {
    this._settingsService.toggleSettings();
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  addEventListenersToElements(tagNames: string[]) {
    tagNames.forEach(tagName => {
      let elementList = document.getElementsByTagName(tagName);
      for (let i = 0; i < elementList.length; i++) {
        const element = elementList[i];
        element.addEventListener('mouseover', (e) => this.mouseOverEvent(e));
        element.addEventListener('mouseout', (e) => this.mouseOutEvent(e));
      }
    })
  }

  mouseOverEvent(e) {
    console.log(e.target['innerText'])
    this._speechService.speak(e.target['innerText'] ?? "text unreadable");
  }

  mouseOutEvent(e) {
    this._speechService.stopRead();
  }

}
