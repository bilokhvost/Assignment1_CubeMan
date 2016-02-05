//Kateryna Bilokhvost
/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeedX = rotationSpeed;
            this.rotationSpeedY = rotationSpeed;
            this.rotationSpeedZ = rotationSpeed;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.randomColour = function () {
            legOne.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            legTwo.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            feetOne.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            feetTwo.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            body.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            neck.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            head.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            handOne.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
            handTwo.material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map