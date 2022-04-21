import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './data.service'

@Pipe({
  name: 'addAuthorization'
})
export class AddAuthorizationPipe implements PipeTransform {

  constructor(private http: HttpClient, private dataService: DataService) {

  }

  async transform(src: string): Promise<string> {
    const storedToken = sessionStorage.getItem("token");
    const headers = new HttpHeaders({ 'authorization': `Bearer ${storedToken}` });
    const imageBlob = await this.http.get(src, { headers, responseType: 'blob' }).toPromise();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      if (imageBlob) {
        reader.onloadend = () => {
          let imageBase64String = reader.result as string;
          //this.dataService.urlToImageMap.set(src, imageBase64String)
          if (src.indexOf('add-colon') != -1) {
            imageBase64String = imageBase64String.replace("base64,", ";base64,");
          }
          resolve(imageBase64String);
        }
        reader.readAsDataURL(imageBlob);
      }
    });
  }

}
