﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('timesbi-normal.ttf', font);
this.addFont('timesbi-normal.ttf', 'timesbi', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])