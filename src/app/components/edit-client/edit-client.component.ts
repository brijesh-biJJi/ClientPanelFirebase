import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
id:string;
client:Client={
  firstName:'',
  lastName:'',
  email:'',
  phone:'',
  balance:0
}

disableBalanceOnEdit:boolean;

  constructor(
    private clientService:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private settingsService:SettingsService
  ) { }

  ngOnInit(): void {
    //Get Id from URL
    this.id=this.route.snapshot.params['id'];

    //Get Client
    this.clientService.getClient(this.id).subscribe(client=> this.client=client );

    this.disableBalanceOnEdit=this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value:Client, valid:boolean}){
    if(!valid){
      //Show Error
      this.flashMessage.show('Please fill out the form correctly...!',{
        cssClass:'alert-danger',timeout:5000
      });
    }
    else{
      //Add ID to Client
      value.id=this.id;
      //Update Client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client Updated Successfully.....',{
        cssClass:'alert-success',timeout:5000
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
