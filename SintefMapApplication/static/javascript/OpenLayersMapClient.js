var applicationType = Backend.Type["COMPUTER"];

var map;
var statensKartverkCommunicator = new StatensKartverkCommunicator();
var barentswatchCommunicator = new BarentswatchMapServicesCommunicator();
var tileLayerWMTS = statensKartverkCommunicator.CreateTileLayerWTMSFromSource(statensKartverkCommunicator.CreateSourceWmts("sjokartraster"), "base", "Norges grunnkart");
var backendCommunicator = BackendFactory.createBackend(applicationType);

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

function zoomToMyPosition() {
    map.setView(new ol.View({
        center: geolocation.getPosition(),
        zoom: 14
    }));
}

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
}

function corsErrBack(error) {
    console.log("Error occurred during a cors request: The following error was raised: " + error);
}

function parseIceChartGeoJsonResponse(data) {
    var iceChartStyleMap = new OpenLayers.StyleMap({
        "default": iceChartStyleLayer,
        "select": new OpenLayers.Style({
            fill: true,
            pointRadius: 8,
            strokeWidth: 2,
            fillColor: "#66ccff",
            strokeColor: "#3399ff",
            graphicZIndex: 2
        })
    });

    var iceChartLayer = map.getLayersByName("Iskonsentrasjon")[0];
    iceChartLayer.styleMap = iceChartStyleMap;
    iceChartLayer.addFeatures(geoJsonFormat.read(data));
}
