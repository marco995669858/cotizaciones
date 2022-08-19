import { Component, OnInit } from '@angular/core';
import { SnackBar } from '@data/interfaces/shared/snackbarI.interface';
import { LoaderService } from '@data/services/loader/loader.service';
import { SharedService } from '@data/services/shared/shared.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  public snackbar: SnackBar;
  public showSnackBar: boolean;

  constructor(
    public loaderService: LoaderService,
    private sharedService: SharedService
  ) {
    this.showSnackBar = false;
  }

  ngOnInit(): void {
    /*this.sharedService.snackBar.subscribe((snackbar: SnackBar) => {
      this.snackbar = snackbar
    });

    this.sharedService.showSnackBar.subscribe((showSnackBar: boolean) => {
      if(showSnackBar){
        this.showSnackBar = showSnackBar;
      }else{
        if(!this.snackbar.button){
          setTimeout(() => {
            this.showSnackBar = showSnackBar;
          }, 4000)
        }
      }
    })*/
  }

  onCloseSnackbar(){
    this.showSnackBar = false;
  }

}
