var map;
var statensKartverkCommunicator = new StatensKartverkCommunicator();
var barentswatchCommunicator = new BarentswatchGeoserverCommunicator();
var tileLayerWMTS = statensKartverkCommunicator.CreateTileLayerWTMSFromSource(statensKartverkCommunicator.CreateSourceWmts("sjokartraster"), "base", "Norges grunnkart");

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
//map.addLayer(barentswatchCommunicator.testWorkingEdge());

function populateFiskInfoWMSLayers() {
    var layers = [];

}