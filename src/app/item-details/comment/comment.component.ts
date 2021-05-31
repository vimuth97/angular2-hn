import { Component, Input, OnInit } from '@angular/core';
import { SpeechService } from 'src/app/shared/services/speech-service/speech.service';

import { Comment } from '../../shared/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() isMainComment: boolean;
  collapse: boolean;
  readText:string;

  constructor(    
    private _speechService : SpeechService,
  ) {}

  ngOnInit() {
    this.collapse = true;
    this.readText = "Show Replies";
  }
  changeCollapse(){
    console.log("change collapse function clicked");
    if(this.collapse ==true){
      this.collapse = false;
      this.readText = "Hide Replies";
    }
    else{
      this.collapse =true;
      this.readText = "Show Replies";
    }
  }

  mouseOverRead(text: string) {
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = text;
    // Retrieve the text property of the element (cross-browser support)
    let result = temporalDivElement.textContent || temporalDivElement.innerText || "not readable content";
    this._speechService.speak(result);
  }

  mouseAwayStopRead() {
    this._speechService.stopRead();
  }
}
