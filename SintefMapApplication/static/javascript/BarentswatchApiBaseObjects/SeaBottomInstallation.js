function SeaBottomInstallation() {
    this._type = BarentswatchApiObjectTypes.SEABOTTOM_INSTALLATION;
    this._norwegianTitle = "Havbunninstallasjon";
    this._name = "";
    this._installationType = "";
    this._depth = "";
    this._belongsToField = "";
    this._startup = "";
    this._operator = "";
    this._position = "";
    this._marinogramUrl = "";
    // More info fields
    this._oilDirectorateFactPageURL = "";
    this._oildirectoryMapURL = "";
}
/*
belong2knd:"FIELD"
belong2nm:"AASTA HANSTEEN"
curopernam:"Statoil Petroleum AS"
cutoperurl:"http://factpages.npd.no/FactPages/default.aspx?nav1=company&nav2=PageView|All&nav3=17237817"
dtstartup:""
facfunc:"GAS PRODUCER"
fackind:"MULTI WELL TEMPLATE"
facname:"AASTA HANSTEEN B"
facturl:"http://factpages.npd.no/FactPages/Default.aspx?nav1=facility&nav2=PageView|Fixed|All&nav3=441847"
787708
idfacility
:
441847
lifetime
:
25mapurl:"http://gis.npd.no/factmaps/html_21/?run=FacilityByNPDID&scale=100000&NPDID=441847"
surface:"N"
version:1162waterdepth:1300
*/
SeaBottomInstallation.prototype.parseObject = function(seaBottomInstallation) {
    this._name = seaBottomInstallation.get("facname");
    this._installationType = seaBottomInstallation.get("fackind");
    this._depth = seaBottomInstallation.get("waterdepth");
    this._belongsToField = seaBottomInstallation.get("belong2knd");
    this._startup = seaBottomInstallation.get("dtstartup");
    this._operator = seaBottomInstallation.get("curopernam");
    this._position = ol.extent.getCenter(seaBottomInstallation.getGeometry().getExtent());
};