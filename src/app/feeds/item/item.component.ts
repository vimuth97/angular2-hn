import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Story } from '../../shared/models/story';

import { SettingsService } from '../../shared/services/settings.service';
import { Settings } from '../../shared/models/settings';
import { SpeechService } from 'src/app/shared/services/speech-service/speech.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit,AfterViewInit {
  @Input() item: Story;
  settings: Settings;

  constructor(
    private _settingsService: SettingsService,
    private _speechService : SpeechService
    ) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {}

  
  ngAfterViewInit(){
    let tagNames = ['a','p','h2', 'h3', 'label', 'button']
    this.addEventListenersToElements(tagNames)
  }

  get hasUrl(): boolean {
    return this.item.url.indexOf('http') === 0;
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
    // console.log(e.target['innerText'])
    this._speechService.speak(e.target['innerText'] ?? "text is not readable");
  }

  mouseOutEvent(e) {
    this._speechService.stopRead();
  }
}
