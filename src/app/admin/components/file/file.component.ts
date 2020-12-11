import { Component, Inject, ɵConsole, Output, EventEmitter } from '@angular/core';
import { UploadServiceService } from 'src/app/services/upload-service.service';

@Component({
  selector: 'file-app',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent {
  @Output() public throttle = new EventEmitter<String>();
  uploadedFiles: Array<File>;
  load = false;

  constructor(private service: UploadServiceService) {

  }
  FILENAME = 'ELIGE UNA CARTA';

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.FILENAME = this.uploadedFiles[0].name;
  }

  upload() {
    if (this.uploadedFiles) {
      this.throttle.emit(this.uploadedFiles[0].name);
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.load = true;
      this.service.uploadFile(formData).subscribe((res) => {
        setTimeout(() => {
          this.load = false;
        }, 2000);
      });
    }
  }
}
