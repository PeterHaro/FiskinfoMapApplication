var BarentswatchStylesRepository = function () {
    "use strict";

    var maxFeatureCount = 0;
    var aisVectorReference = null;
    var toolsVectorReference = null;

    var iceChartStyles = {
        "Close Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(251, 156, 69, 0.5)"
            })
        })],
        "Very Close Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 64, 64, 0.5)"
            })
        })],
        "Fast Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(195, 197, 199, 0.5)"
            })
        })],
        "Open Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 255, 64, 0.5)"
            })
        })],
        "Very Open Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(165, 253, 184, 0.5)"
            })
        })],
        "Open Water": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(176, 214, 255, 0.5)"
            })
        })]
    };

    var iceChartSelectStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(51, 153, 255, 1)",
                width: 2
            })
        })],
        zIndex: 2
    };

    var activeSeismicStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(119, 190, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })]
    };

    var activeSeismicSelectStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })],
        zIndex: 2
    };

    var plannedSeismicStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })]
    };

    var plannedSeismicSelectStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })],
        zIndex: 2
    };

    var seaBottomInstallationsStyles = {
        "Point": [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "rgba(238, 150, 149, 0.8)"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(8, 113, 114, 1)", width: 2
                })
            })
        })]
    };

    var seaBottomInstallationsSelectStyles = {
        "Point": [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "rgba(102, 204, 255, 0.8)"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(8, 113, 114, 1)", width: 2
                })
            })
        })],
        zIndex: 2
    };

    var jMessageStyles = {
        "MultiPolygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })]
    };

    var jMessageSelectionStyles = {
        "MultiPolygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })], zIndex: 2
    };

    var coastalRegulationsStyles = {
        "LineString": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(217, 207, 56, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(217, 207, 56, 1)",
                width: 6
            })
        })]
    };

    var coastalRegulationsSelectionStyles = {
        "LineString": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(217, 207, 56, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 6
            })
        })], zIndex: 2
    };

    var coralReefStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })]
    };

    var coralReefSelectionStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })], zIndex: 2
    };

    function createAisSingleFeatureStyle(feature) {
        if (!feature) {
            return;
        }
        var featureName = "";
        if (feature.values_.ShipType === 30) {
            featureName = "fishing-vessel";
        } else {
            featureName = "non-fishing-vessel";
        }
        var style = aisStyles[featureName];
        style.image_.setRotation(feature.values_.Cog);
        return style;
    }

    function createToolSingleFeatureStyle(feature) {
        if (!feature) {
            return;
        }
        return toolStyles[feature.getGeometry().getType()];
    }

    var aisStyles = {
        "fishing-vessel": new ol.style.Style({
            image: new ol.style.Icon({
                //anchor: [0.5, 46],
                src: './boat-orange.svg',
                // imgSize: [13, 29],
            })
        }),
        "non-fishing-vessel": new ol.style.Style({
            image: new ol.style.Icon({
                src: './boat-grey.svg'
            })
        })
    };

    var aisSelectionStyles = {
        "fishing-vessel": new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 5,
                radius: 10,
                radius2: 4,
                angle: 0
            })
        }),
        "non-fishing-vessel": new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 5,
                radius: 10,
                radius2: 4,
                angle: 0
            })
        })
    };

    var toolStyles = {
        "Point": [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "rgba(0, 255, 0, 0.8)"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(51, 153, 255, 1)", width: 2
                })
            })
        })],
        "LineString": new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(0, 255, 0, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(255, 0, 0, 1)", width: 2
            })
        })
    };
    var toolSelectionStyles = {
        "Point": [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "rgba(255, 255, 255, 0.8)"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(51, 153, 255, 1)", width: 2
                })
            })
        })],
        "LineString": new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#AAAA',
                width: 2
            })
        })
    };

    var iceChartStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return iceChartStyles[feature.get("icetype")];
    };
    var activeSeismicStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return activeSeismicStyles[feature.getGeometry().getType()];
    };
    var plannedSeismicStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return plannedSeismicStyles[feature.getGeometry().getType()];
    };
    var seaBottomInstallationsStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return seaBottomInstallationsStyles[feature.getGeometry().getType()];
    };
    var jMessagesStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return jMessageStyles[feature.getGeometry().getType()];
    };
    var coastalRegulationsStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return coastalRegulationsStyles[feature.getGeometry().getType()];
    };
    var coralReefStyleFunction = function (feature, resoltion) {
        if (!feature) {
            return;
        }
        return coralReefStyles[feature.getGeometry().getType()];
    };

    var calculateClusterInfo = function (resolution, clusterType) {
        maxFeatureCount = 0;
        var features = null;
        if (clusterType === "tools") {
            features = BarentswatchStylesRepository.GetToolsVectorReference().getSource().getFeatures();
        } else if (clusterType === "ais") {
            features = BarentswatchStylesRepository.GetAisVectorReference().getSource().getFeatures();
        }
        var feature, radius;
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            var originalFeatures = feature.get('features');
            var extent = ol.extent.createEmpty();
            var j, jj;
            for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
                ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
            }
            maxFeatureCount = Math.max(maxFeatureCount, jj);
            radius = 0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /
                resolution;
            feature.set('radius', radius);
        }
    };

    var textFill = new ol.style.Fill({
        color: '#fff'
    });
    var textStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3
    });
    var invisibleFill = new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)'
    });


    var oldAISClusterStyleResolution;
    var oldToolClusterStyleResolution;
    var aisClusterStyleFunction = function (feature, resolution) {
        if (resolution != oldAISClusterStyleResolution) {
            calculateClusterInfo(resolution, "ais");
            oldAISClusterStyleResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: [255, 153, 0, Math.min(0.8, 0.4 + (size / maxFeatureCount))]
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: textFill,
                    stroke: textStroke
                })
            });            var extent = new ol.extent.createEmpty();
            feature.get('features').forEach(function (f, index, array) {
                ol.extent.extend(extent, f.getGeometry().getExtent());
            });
            map.getView().fit(extent, map.getSize());
        } else {
            var originalFeature = feature.get("features")[0];
            style = createAisSingleFeatureStyle(originalFeature);
        }
        return style;
    };

    var _aisSelectionStyleFunction = function (feature) {
        var styles = [new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: invisibleFill
            })
        })];
        var originalFeatures = feature.get('features');
        var originalFeature;
        for (var i = originalFeatures.length - 1; i >= 0; --i) {
            originalFeature = originalFeatures[i];
            styles.push(createAisSingleFeatureStyle(originalFeature));
        }
        return styles;
    };

    var toolsClusterStyleFunction = function (feature, resolution) {
        if (resolution != oldToolClusterStyleResolution) {
            calculateClusterInfo(resolution, "tools");
            oldToolClusterStyleResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: [1, 255, 132, Math.min(0.8, 0.4 + (size / maxFeatureCount))]
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: textFill,
                    stroke: textStroke
                })
            });
        } else {
            var originalFeature = feature.get("features")[0];
            style = createToolSingleFeatureStyle(originalFeature);
        }
        return style;
    };

// __BEGIN_SELECT_STYLES_
    var iceChartSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return iceChartSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var activeSeismicSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return activeSeismicSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var plannedSeismicSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return plannedSeismicSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var seaBottomInstallationsSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                console.log(feature.getGeometry().getType());
                return seaBottomInstallationsSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var jMessagesSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return jMessageSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
    var coastalRegulationsSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return coastalRegulationsSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
    var coralReefSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return coralReefSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
    var aisSelectionStyleFunction = function () {
        return new ol.interaction.Select({
            condition: function (evt) {
                return evt.type == 'singleclick';
            },
            style: _aisSelectionStyleFunction
        });
    };
    var toolSelectionStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                console.log("Inside: toolSelectionStyleFunction");
                console.log(feature.getGeometry());
                return toolSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
// __END_SELECT_STYLES_

    // GETTERS_AND_SETTERS
    //TODO: HACK, FIGURE OUT HOW TO REMOVE THIS
    // These are used to style the clustering layers, in order to get correct references
    function setAisVectorLayer(layer) {
        this.aisVectorReference = layer;
    }

    function getAisVectorReference() {
        return this.aisVectorReference;
    }

    function setToolVectorLayer(layer) {
        this.toolsVectorReference = layer;
    }

    function getToolVectorLayeer() {
        return this.toolsVectorReference;
    }

    // __END_GETTERS_AND_SETTERS

    return {
        BarentswatchIceChartStyle: iceChartStyleFunction,
        BarentswatchIceChartSelectionStyle: iceChartSelectStyleFunction,
        BarentswatchActiveSeismicStyle: activeSeismicStyleFunction,
        BarentswatchActiveSeismicSelectionStyle: activeSeismicSelectStyleFunction,
        BarentswatchPlannedSeismicStyle: plannedSeismicStyleFunction,
        BarentswatchPlannenSeismicSelectionStyle: plannedSeismicSelectStyleFunction,
        BarentswatchSeaBottomInstallationsStyle: seaBottomInstallationsStyleFunction,
        BarentswatchSeaBottomInstallationsSelectionStyle: seaBottomInstallationsSelectStyleFunction,
        BarentswatchJMessagesStyle: jMessagesStyleFunction,
        BarentswatchJMessagesSelectionStyle: jMessagesSelectStyleFunction,
        BarentswatchCoastalRegulationStyle: coastalRegulationsStyleFunction,
        BarentswatchCoastalRegulationSelectionStyle: coastalRegulationsSelectStyleFunction,
        BarentswatchCoralReefStyle: coralReefStyleFunction,
        BarentswatchCoralReefSelectionStyle: coralReefSelectStyleFunction,
        BarentswatchAisStyle: aisClusterStyleFunction,
        BarentswatchAisSelectionStyle: aisSelectionStyleFunction,
        SetAisVectorLayer: setAisVectorLayer,
        GetAisVectorReference: getAisVectorReference,
        BarentswatchToolStyle: toolsClusterStyleFunction,
        SetToolsVectorLayer: setToolVectorLayer,
        GetToolsVectorReference: getToolVectorLayeer,
        BarentswatchToolSelectionStyle: toolSelectionStyleFunction
    }

}();