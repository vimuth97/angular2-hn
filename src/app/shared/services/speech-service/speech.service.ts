import { Injectable } from '@angular/core';
import Speech from 'speak-tts';
import { NotificationService } from '../notification-service/notification.service';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  isSpeechAvailable: boolean = true;
  speech: any;
  speechData: any;


  constructor(
    private _settingsService :SettingsService,
    private _notificationService: NotificationService
  ) {

    this.speech = new Speech() // will throw an exception if not browser supported

    //set Available State
    if (this.speech) {
      this.isSpeechAvailable = this.speech.hasBrowserSupport();
    } else {
      this.isSpeechAvailable = false;
    }

    if (!this.isSpeechAvailable) {
      this._notificationService.showInfo("Text To Speech is Unavailable for this browser", "Help")
    } else {
      console.log("speech synthesis supported")
      this.speech.init({
        'volume': 1,
        'lang': 'en-GB',
        'rate': 1,
        'pitch': 1,
        'voice': 'Google UK English Female',
        'splitSentences': true,
        'listeners': {
          'onvoiceschanged': (voices) => {
            console.log("Event voiceschanged", voices)
          }
        }
      }).then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
        this.speechData = data;
        // if (!this.speechData.voice) this.speechData.voice = "Google UK English Female"
        data.voices.forEach(voice => {
          console.log(voice.name + " " + voice.lang)
        });
      }).catch(e => {
        console.error("An error occured while initializing : ", e)
      });

      // this._notificationService.showInfo("Text To Speech is available for this browser", "Help")
      this.speak("Text To Speech is available for this browser, To disable click on settings")
    }
  }


  speak(text: string) {
    if (this.isSpeechAvailable && this._settingsService.settings.isTextToSpeechEnabled) {
      this.speech.speak({
        text: text,
      }).then(() => {
        console.log("Success : "+text)
      }).catch(e => {
        console.error("An error occurred :", e)
      })
    }
  }

  test() {
    this.speak("This is a test text input");
  }

  stopRead(){
    this.speech.cancel();
  }
}
