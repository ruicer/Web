import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'video-app',
  templateUrl: './video-inicio.component.html',
  styleUrls: ['./video-inicio.component.scss']
})
export class VideoInicio implements OnInit {

  constructor(private embedService: EmbedVideoService) {

  }
  ngOnInit() {

  }

}