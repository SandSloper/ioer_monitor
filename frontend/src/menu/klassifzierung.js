const klassifzierung = {
    paramter:"klassifizierung",
    getDOMObject:function(){
        $elem = $('#menu_klassifizierung');
        return $elem;
    },
    getParamter:function(){
        return urlparamter.getUrlParameter(this.paramter);
    },
    setParamter:function(_value){
        urlparamter.setUrlParameter(this.paramter,_value);
    },
    updateParamter:function(_value){
        urlparamter.updateURLParameter(this.paramter,_value);
    },
    removeParameter:function(){
        urlparamter.removeUrlParameter(this.paramter);
    },
    getSelectionId:function(_modus){
        const object = this;
        let parameter = this.getParamter();
        if(raeumliche_visualisierung.getRaeumlicheGliederung()==='gebiete'|| _modus==="gebiete") {
            if (!parameter) {
                object.setParamter('haeufigkeit');
            }
            return object.getParamter();
        }else{
            //raster
            let values = ['gleicheAnzahl','gleicheBreite'];
            if(parameter === 'haeufigkeit'){
                return values[0];
            }else{
                return values[1];
            }
        }
    },
    init:function() {
        this.constroller.set();
    },
    constroller:{
        set:function() {
            klassifzierung.getDOMObject()
                .find('input')
                .unbind()
                .change(function () {
                    let value = $(this).val();
                    farbliche_darstellungsart.resetSelection();
                    klassifzierung.updateParamter(value);
                    if (raeumliche_visualisierung.getRaeumlicheGliederung() === 'gebiete') {
                        if (typeof raumgliederung.getSelectedId() !== 'undefined') {
                            indikator_json.init(raumgliederung.getSelectedId());
                        } else {
                            indikator_json.init();
                        }
                    } else {
                        indikator_raster.init();
                    }
                });
        }
    }
};