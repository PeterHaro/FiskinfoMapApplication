var applicationType = Backend.Type["COMPUTER"];

var map;
var statensKartverkCommunicator = new StatensKartverkCommunicator();
var barentswatchCommunicator = new BarentswatchMapServicesCommunicator();
var tileLayerWMTS = statensKartverkCommunicator.CreateTileLayerWTMSFromSource(statensKartverkCommunicator.CreateSourceWmts("sjokartraster"), "base", "Norges grunnkart");
var backendCommunicator = BackendFactory.createBackend(applicationType);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

// __GEOLOCATION
var geolocator = null;
var sensor = false;
// __END_GEOLOCATION

map = new ol.Map({
    layers: [tileLayerWMTS],
    target: 'map',
    view: new ol.View({
        center: ol.proj.transform([15.5, 68], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

// Set extent
//TODO: SET MORE ACCURAT MAP EXTENT, IGNORE ANTARTICA ETC, only show greenland, norway, russia and england. ALlow some towards canada
/*var extent = ol.extent.createEmpty();
 map.getLayers().forEach(function (layer) {
 ol.extent.extend(extent, layer.getSource().getExtent());
 });
 map.getView().fitExtent(extent, map.getSize()); */

//WAVE WMS TEST
map.addLayer(barentswatchCommunicator.createWaveWarningSingleTileWMS());
map.addLayer(barentswatchCommunicator.createIceEdgeSingleTileWMS());
populateMap();

/*

 var npdFacilityStyleLayer = new OpenLayers.Style(npdFacilityStyle, {
 context: {
 pointRadius: function (feature) {
 retVal = map.getZoom() > 6 ? 11 : 7;
 return retVal;
 },
 }
 });

 new OpenLayers.Layer.Vector("Havbunnsinstallasjoner", {
 strategies: [new OpenLayers.Strategy.Cluster({
 distance: map.getZoom() > 7 ? 5 : 15,
 threshold: 2
 })]
 }),

 */

function createClusterSource(_source) {
    return new ol.source.Cluster({
        source: _source
    });
}


function buggyZoomToMyPosition() {
    geolocator = new Geolocator(true, tileLayerWMTS.getSource().getProjection());
    var localGeolocationObject = geolocator.getGeolocation();
    localGeolocationObject.on('change', function () {
        map.setView(new ol.View({
            center: localGeolocationObject.getPosition(),
            zoom: 13
        }));
    });
}

var iceChartSelectStyles = {
    "D": new ol.style.Style({
        image: new ol.style.Circle({
            radius: 8,
            snapToPixel: false,
            fill: new ol.style.Fill({color: 'rgba(102, 204, 255, 1)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(51, 153, 255, 1)',
                width: 2
            })
        })
    }),
    zIndex: 2
};

var displayFeatureInfo = function (pixel) {
    var features = [];
    var layers = [];
    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        features.push(feature);
        layers.push(layer);
        console.log(feature);
        console.log(layer);
    });

    //Handle only last selected feature
    var selectedLayerName = layers[layers.length - 1].get("title");
    switch(selectedLayerName) {

    }


};

function populateMap() {
    var iceChartLayer = barentswatchCommunicator.createApiServiceVectorLayer("icechart", BarentswatchStylesRepository.BarentswatchIceChartStyle);
    var ongoingSeismic = barentswatchCommunicator.createApiServiceVectorLayer("npdsurveyongoing", BarentswatchStylesRepository.BarentswatchActiveSeismicStyle);
    var plannedSeismic = barentswatchCommunicator.createApiServiceVectorLayer("npdsurveyplanned", BarentswatchStylesRepository.BarentswatchPlannedSeismicStyle);
    var facilityLayer = barentswatchCommunicator.createApiServiceVectorLayer("npdfacility", BarentswatchStylesRepository.BarentswatchSeaBottomInstallationsStyle);
    var legalMessages = barentswatchCommunicator.createApiServiceVectorLayer("jmelding", BarentswatchStylesRepository.BarentswatchJMessagesStyle);
    var coastalcodRegulations = barentswatchCommunicator.createApiServiceVectorLayer("coastalcodregulations", BarentswatchStylesRepository.BarentswatchCoastalRegulationStyle);
    var coralReef = barentswatchCommunicator.createApiServiceVectorLayer("coralreef", BarentswatchStylesRepository.BarentswatchCoralReefStyle);
    var aisData = barentswatchCommunicator.fetchAISData();
    map.addLayer(iceChartLayer);
    map.addLayer(ongoingSeismic);
    map.addLayer(plannedSeismic);
    map.addLayer(facilityLayer);
    map.addLayer(legalMessages);
    map.addLayer(coastalcodRegulations);
    map.addLayer(coralReef);
    map.addLayer(aisData);

    // SELECT HANDLERS
    // __BEGIN_SELECTION_STYLES_
    map.addInteraction(BarentswatchStylesRepository.BarentswatchIceChartSelectionStyle());
    map.addInteraction(BarentswatchStylesRepository.BarentswatchActiveSeismicSelectionStyle());
    map.addInteraction(BarentswatchStylesRepository.BarentswatchPlannenSeismicSelectionStyle());
    map.addInteraction(BarentswatchStylesRepository.BarentswatchSeaBottomInstallationsSelectionStyle());
    map.addInteraction(BarentswatchStylesRepository.BarentswatchJMessagesSelectionStyle());
    map.addInteraction(BarentswatchStylesRepository.BarentswatchCoastalRegulationSelectionStyle());
    map.addInteraction(BarentswatchStylesRepository.BarentswatchCoralReefSelectionStyle());
    // __END_SELECTION_STYLES_

    // TEST GLOBAL SELECTOR
    map.on("singleclick", function (evt) {
        displayFeatureInfo(evt.pixel);
    });
}

function corsErrBack(error) {
    console.log("Error occurred during a cors request: The following error was raised: " + error);
}

// __SIMPLE_GEOLOCATION_INTERFACE_
function populateUserPosition(callback) {
    /*Based on W3C standards specification: http://dev.w3.org/geo/api/spec-source.html */
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, fail, {timeout: 60000});
        return true;
    } else {
        return false;
    }
}

function zoomToUserPosition() {
    sensor = populateUserPosition(function (position) {
        var userPosition = ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857');
        map.setView(new ol.View({
            center: userPosition,
            zoom: 10
        }));
    });
}

function fail() {
    alert("Noe gikk galt, venligst sjekk om du har internett- eller Ggps (gps, glonass osv) forbindelse");
}

// __END_SIMPLE_GEOLOCATION_INTERFACE_