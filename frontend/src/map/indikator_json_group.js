var jsongroup = new L.FeatureGroup();
const indikator_json_group = {
    highlight:function(ags, fit_bounds){
        try {
            jsongroup.eachLayer(function (layer) {
                layer.eachLayer(function (layer) {
                    let ags_feature = layer.feature.properties.ags;
                    if (ags === ags_feature) {
                        if (fit_bounds) {
                            let bounds = layer.getBounds();
                            map.fitBounds(bounds);
                        }
                        layer.setStyle(style.getActive());
                        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                            layer.bringToFront();
                        }
                        return false;
                    } else {
                        return false;
                    }
                });
            });
        }catch(err){}
    },
    resetHightlight:function(){
        try {
            jsongroup.eachLayer(function (layer) {
                layer.eachLayer(function (layer) {
                    layer.setStyle(style.getLayerStyle(layer.feature.properties.value));
                    return false;
                });
            });
        }catch(err){}
    },
    fitBounds:function(){
        if (raeumliche_visualisierung.getRaeumlicheGliederung() === 'raster') {
            map.setView(new L.LatLng(50.9307, 9.7558), 6.8);
        } else {
            try{
                map.fitBounds(jsongroup.getBounds());
            }catch(e){
                map.fitBounds(indikator_json.getJSONLayer().getBounds());
            }
        }
    },
    clean:function(){
        jsongroup.clearLayers();
        jsongroup_grund.clearLayers();
    },
    getLayerArray:function(exluded_areas){
        let ags_array = [];
        jsongroup.eachLayer(function (layer) {
            layer.eachLayer(function (layer) {
                //exclude by des
                let des = layer.feature.properties.spatial_class,
                    ags_feature = layer.feature.properties.ags,
                    name = layer.feature.properties.gen,
                    fc = layer.feature.properties.fc,
                    grundakt = layer.feature.properties.grundakt,
                    value = layer.feature.properties.value,
                    hc = layer.feature.properties.hc,
                    value_comma = layer.feature.properties.value_comma,
                    krs = function(){
                        if(layer.feature.properties.kreis){
                            return layer.feature.properties.kreis;
                        }
                    };
                if($.inArray(des,exluded_areas)===-1){
                    ags_array.push({
                        ags: ags_feature,
                        gen: name,
                        fc: fc,
                        grundakt: grundakt,
                        value: value,
                        hc: hc,
                        value_comma: value_comma,
                        des: des,
                        krs:krs()
                    });
                }
            });
        });
        return ags_array;
    }
};