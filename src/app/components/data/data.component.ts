import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray ,Validators } from '@angular/forms';

@Component({
  	selector: 'app-data',
  	templateUrl: './data.component.html',
  	styles: []
})
export class DataComponent implements OnInit {

	public form:FormGroup;
    public usuario:Object = {
        nombreCompleto:{
            nombre:'Jonatan',
            apellido:'Morales'
        },
        email:'jony@gmail.com',
        hobbies: ['Hacer ejercicio','leer','programar']
    };

  	constructor() { 
  		/*this.form = new FormGroup({
  			'nombre': new FormControl('', [Validators.required, Validators.minLength(3)] ),
  			'apellido': new FormControl('', Validators.required ),
  			'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] )
  		});*/

        this.form = new FormGroup({
            'nombreCompleto': new FormGroup({
                'nombre': new FormControl('', [Validators.required, Validators.minLength(3)] ),
                'apellido': new FormControl('', [Validators.required, this.mayuscula] )
            }),
            'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] ),
            'hobbies': new FormArray([ 
                new FormControl('', Validators.required)
            ]),
            'password': new FormControl('', Validators.required),
            'password1': new FormControl()
        });

        //this.form.setValue( this.usuario );
        this.form.controls['password1'].setValidators([ Validators.required, this.igual.bind(this.form)]);
        this.form.controls['email'].valueChanges.subscribe( data =>{ console.log(data)});
  	}

 	ngOnInit() {}

 	public sendData(): any{
 		console.log(this.form.value);
        this.form.reset({
            nombreCompleto:{
                nombre:'',
                apellido:''
            },
            email:'',
            hobbies: ['']
        });
 	}

    public appendHobbie(): any{
        (<FormArray>this.form.controls['hobbies']).push( new FormControl('', Validators.required));
    }     

    public mayuscula(control: FormControl): {[s:string]: boolean} {
        if(control.value == "M"){
            return{ no:true }
        }
        return null;    
    }

    public igual(control: FormControl): {[s:string]: boolean} {
        //console.log(this);
        let form: any = this;
        if(control.value != form.controls['password'].value){
            return{ no:true }
        }
        return null;    
    }
}
