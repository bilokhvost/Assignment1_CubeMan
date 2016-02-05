/*controls.ts
Kateryna Bilokhvost
Last Modified by: Kateryna Bilokhvost
Date last Modified: Feb 04, 2016
This is a program for cube man display.
The following controls are available: change rotation speed and change man's color
Revision History:
    Commit 1-3: Created the project file
    Commit 4: Added the greem humonoid
    Commit 5: Code optimization, adding new colors, fixed the camera
    Commit 6: Rotation was added
    Commit 7: Shadow issue is fixed
    Commit 8: Possibility to change colors was added
    Commit 9: Comments were added

*/
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
        //random change of colors
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