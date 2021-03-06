var applicationType = Backend.Type.COMPUTER;

var map;
var statensKartverkCommunicator = new StatensKartverkCommunicator();
var barentswatchCommunicator = new BarentswatchMapServicesCommunicator();
var tileLayerWMTS = statensKartverkCommunicator.CreateTileLayerWTMSFromSource(statensKartverkCommunicator.CreateSourceWmts("sjokartraster"), "base", "Norges grunnkart");
var barentswatchObjectFactory = new BarentswatchApiObjectFactory();
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
var popupOverlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});


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

function dispatchDataToBottomsheet(feature, type) {
    var _feature = barentswatchObjectFactory.create(type);
    _feature.parseObject(feature);
    //DISPATCH HERE
    backendCommunicator.showBottmsheet(_feature);


}

// TODO: REFACTOR ME
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
    switch (selectedLayerName) {
        case "icechart":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.ICE_CONSENTRATION);
            break;
        case "npdsurveyongoing":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.ONGOING_SEISMIC);
            break;
        case "npdsurveyplanned":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.PLANNED_SEISMIC);
            break;
        case "npdfacility":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.SEABOTTOM_INSTALLATION);
            break;
        case "jmelding":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.JMESSAGE);
            break;
        case "coastalcodregulations":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.COASTLINES_COD);
            break;
        case "coralreef":
            dispatchDataToBottomsheet(features[features.length - 1], BarentswatchApiObjectTypes.CORAL_REEF);
            break;
        default:
            popupOverlay.setPosition(undefined);
            closer.blur();
            break;
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
    //   var aisData = barentswatchCommunicator.fetchAISData();
    var actualAisData = barentswatchCommunicator.createAisVectorLayer(backendCommunicator);


    map.addLayer(iceChartLayer);
    map.addLayer(ongoingSeismic);
    map.addLayer(plannedSeismic);
    map.addLayer(facilityLayer);
    map.addLayer(legalMessages);
    map.addLayer(coastalcodRegulations);
    map.addLayer(coralReef);
    map.addLayer(actualAisData);

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

// __BEGIN_POPUP_
/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
    popupOverlay.setPosition(undefined);
    closer.blur();
    return false;
};

// __END_POPUP