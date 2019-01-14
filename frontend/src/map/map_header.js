const map_header ={
    getDOMObject:function(){
        $elem = $('.indikator_header');
        return $elem;
    },
    show:function(){
        this.getDOMObject().show();
    },
    hide:function(){
        this.getDOMObject().hide();
    },
    set:function(){
        const object = this;
        setTimeout(function(){
            let spatial_object = object.getDOMObject().find('#header_raumgl'),
                indikator_text=object.getDOMObject().find('#header'),
                indikator_name = indikatorauswahl.getSelectedIndikatorText_Lang(),
                time = zeit_slider.getTimeSet(),
                spatial_text = raeumliche_analyseebene.getSelectionText(),
                split_txt=function(){
                    let txt = "als";
                    if(language_manager.getLanguage()==="en"){
                        txt="as";
                    }
                    return " "+txt+" ";
                };

            if(raeumliche_visualisierung.getRaeumlicheGliederung()==='gebiete'){
                if(!raumgliederung.getSelectedId() && gebietsauswahl.countTags()==0){
                    spatial_text = raeumliche_analyseebene.getSelectionText()+" in Deutschland";
                }else if(!raumgliederung.getSelectedId() && gebietsauswahl.countTags()>0){
                    spatial_text = gebietsauswahl.getSelectionAsString();
                }else{
                    spatial_text = gebietsauswahl.getSelectionAsString()+split_txt()+raumgliederung.getSelectionText();
                }
            }
            indikator_text.text(indikator_name+" ("+time+")");
            spatial_object.text(spatial_text);
        },1000);
    },
};