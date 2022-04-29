import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DataService } from '../data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

enum UploadTabName {
  ImageFileTab,
  ExcelFileTab,
  SuccessOrFailureTab
}

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

  tabName: UploadTabName = UploadTabName.ImageFileTab;

  selectedExcelFileList: FileList;

  selectedImageFileList: FileList;

  DEFAULT_IMAGE_SELECTION_TITLE: string = 'Select image files'

  imageFileSelectionTitle: string;

  DEFAULT_EXCEL_SELECTION_TITLE: string = 'Select excel files';

  excelFileSelectionTitle: string

  iconSuccessOrFailure: string;

  successOrFailureTitle: string;

  successOrFailureContent: string;

  @ViewChild('imageFileUpload') imageFileUploadElementRef: ElementRef;

  @ViewChild('excelFileUpload') excelFileUploadElementRef: ElementRef;



  constructor(private dataService: DataService, private spinner: NgxSpinnerService, private router: Router) {
    this.imageFileSelectionTitle = this.DEFAULT_IMAGE_SELECTION_TITLE;
    this.excelFileSelectionTitle = this.DEFAULT_EXCEL_SELECTION_TITLE;
  }

  ngOnInit(): void {
  }

  next() {
    if (this.selectedImageFileList && this.selectedImageFileList.length) {
      this.tabName = UploadTabName.ExcelFileTab;
    }

  }

  previous() {
    this.tabName = UploadTabName.ImageFileTab;
  }
  uploadAll() {
    if (this.selectedExcelFileList != null && this.selectedExcelFileList.length && this.selectedImageFileList && this.selectedImageFileList.length) {
      this.spinner.show();

      let excelFile = this.selectedExcelFileList[0];
      let formData = new FormData();
      formData.append("multi-files", excelFile);
      let imgFileList = this.selectedImageFileList;
      for (let i = 0; i < imgFileList.length; i++) {
        formData.append("multi-files", imgFileList[i]);
      }
      this.dataService.upload(formData).subscribe(res => {
        console.log("File upload successful");
        this.spinner.hide();
        this.updateSuccessOrFailureTabValue(true);
        setTimeout(() => {
          this.resetView();
        }, 10000)
      }, err => {
        console.log("File upload failed");
        this.spinner.hide();
        this.updateSuccessOrFailureTabValue(false);
        setTimeout(() => {
          this.resetView();
        }, 10000)
      })
    }
  }

  updateSuccessOrFailureTabValue(successful) {
    this.tabName = UploadTabName.SuccessOrFailureTab;
    this.iconSuccessOrFailure = successful ? "cloud_done" : "cancel"
    this.successOrFailureTitle = successful ? "File Upload Successful" : "File Upload Failed"
    this.successOrFailureContent = successful ? "All files uploaded successfully" : "Unable to upload files at the moment. Please try again later."
  }

  resetView() {
    this.imageFileSelectionTitle = this.DEFAULT_IMAGE_SELECTION_TITLE;
    this.excelFileSelectionTitle = this.DEFAULT_EXCEL_SELECTION_TITLE;
    //this.tabName = UploadTabName.ImageFileTab;
    this.selectedExcelFileList = new FileList();
    this.selectedImageFileList = new FileList();
    this.imageFileUploadElementRef.nativeElement.value = '';
    this.excelFileUploadElementRef.nativeElement.value = '';
    this.router.navigate(['/home']);
  }

  updateSelectImageFiles(event: any) {
    this.selectedImageFileList = event.target.files;
    if (this.selectedImageFileList && this.selectedImageFileList.length) {
      let noOfimageFileSelected = this.selectedImageFileList.length;
      this.imageFileSelectionTitle = noOfimageFileSelected == 1 ? "1 File Selected" : `${noOfimageFileSelected} Files Selected`
    } else {
      this.imageFileSelectionTitle = this.DEFAULT_IMAGE_SELECTION_TITLE;
    }

  }

  updateSelectExcelFile(event: any) {
    this.selectedExcelFileList = event.target.files;
    if (this.selectedExcelFileList && this.selectedExcelFileList.length) {
      let excelFile = this.selectedExcelFileList[0];
      this.excelFileSelectionTitle = excelFile.name;
    } else {
      this.excelFileSelectionTitle = this.DEFAULT_EXCEL_SELECTION_TITLE;
    }

  }
}
