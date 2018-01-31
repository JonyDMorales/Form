import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  	selector: 'app-template',
  	templateUrl: './template.component.html',
  	styles: [`
	.ng-invalid.ng-touched:not(form){
		border: 2px solid red;
	}
  	`]
})
export class TemplateComponent implements OnInit {

	usuario:Object = {
		nombre: null,
		apellidos: null,
		email: null
	}

  	constructor() { }

  	ngOnInit() {}

  	public sendData(forma: NgForm): any {
  		console.log('valores: ' + JSON.stringify(forma.value));
  	}

}
