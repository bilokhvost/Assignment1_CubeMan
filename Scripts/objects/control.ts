//Kateryna Bilokhvost
/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
      public rotationSpeedX:number;
      public rotationSpeedY:number;
      public rotationSpeedZ:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
      constructor(rotationSpeed:number) {
         this.rotationSpeedX = rotationSpeed;
         this.rotationSpeedY = rotationSpeed;
         this.rotationSpeedZ = rotationSpeed;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
         public randomColour(): void {
          legOne.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            legTwo.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            feetOne.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            feetTwo.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            body.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            neck.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            head.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            handOne.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
            handTwo.material.setValues({color: (Math.random() * 0xFFFFFF << 0)});
  
        }
}
}
