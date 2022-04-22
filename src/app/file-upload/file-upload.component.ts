import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  // animations: [
  //   trigger('slideMenu', [
  //     state('false', style({
  //       transform: 'translateX(-100%)'
  //     })),
  //     state('true', style({
  //       transform: 'translateX(0)'
  //     })),
  //     transition('true <=> false', animate('400ms ease-in-out'))
  //   ])
  // ]
})
export class FileUploadComponent implements OnInit {

  isVisible: boolean = true;

  selectedExcelFileList: FileList;

  selectedImageFileList: FileList;

  imageFileSelectionTitle: string = 'Select image files'

  excelFileSelectionTitle: string = 'Select excel files'



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  next() {
    this.isVisible = this.isVisible ? false : true;
  }

  uploadAll() {
    if (this.selectedExcelFileList != null && this.selectedExcelFileList.length && this.selectedImageFileList && this.selectedImageFileList.length) {
      let noOfimageFileSelected = this.selectedImageFileList.length;
      this.imageFileSelectionTitle = noOfimageFileSelected == 1 ? "1 File Selected" : `${noOfimageFileSelected} Files Selected`
      let excelFile = this.selectedExcelFileList[0];
      this.excelFileSelectionTitle = excelFile.name;
      let formData = new FormData();
      formData.append("multi-files", excelFile);
      let imgFileList = this.selectedImageFileList;
      for (let i = 0; i < imgFileList.length; i++) {
        formData.append("multi-files", imgFileList[i]);
      }
      this.dataService.upload(formData).subscribe(res => {
        console.log("File upload successful");
      }, err => {
        console.log("File upload failed");

      })
    }
  }

  selectImageFiles(event: any) {
    this.selectedImageFileList = event.target.files;
  }

  selectExcelFile(event: any) {
    this.selectedExcelFileList = event.target.files;
  }
}
