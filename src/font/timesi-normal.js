﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('timesi-normal.ttf', font);
this.addFont('timesi-normal.ttf', 'timesi', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])