
class AssetLoader {
    private static _instance: AssetLoader;
    public static get instance() { if (!this._instance) { this._instance = new AssetLoader(); } return this._instance; }

    public loadAssets(imageList: Array<{ fileName, imgSrc }>) {
        try {
       
            console.log('trying to load: carlos_-_susan'); imageList.push({ fileName:'carlos_-_susan.png', imgSrc: require('../assets/portraits/carlos_-_susan.png')} ); 
            console.log('trying to load: brandon_-_michelle'); imageList.push({ fileName:'brandon_-_michelle.png', imgSrc: require('../assets/portraits/brandon_-_michelle.png')} ); 
            console.log('trying to load: el_tiguere_-_bianca'); imageList.push({ fileName:'el_tiguere_-_bianca.png', imgSrc: require('../assets/portraits/el_tiguere_-_bianca.png')} ); 
            console.log('trying to load: diane_page'); imageList.push({ fileName:'diane_page.png', imgSrc: require('../assets/portraits/diane_page.png')} ); 
            console.log('trying to load: latisha_hardy'); imageList.push({ fileName:'latisha_hardy.png', imgSrc: require('../assets/portraits/latisha_hardy.png')} ); 
            console.log('trying to load: nathan_hook'); imageList.push({ fileName:'nathan_hook.png', imgSrc: require('../assets/portraits/nathan_hook.png')} ); 
            console.log('trying to load: daniel_agosto'); imageList.push({ fileName:'daniel_agosto.png', imgSrc: require('../assets/portraits/daniel_agosto.png')} ); 
            console.log('trying to load: eder_-_milton'); imageList.push({ fileName:'eder_-_milton.png', imgSrc: require('../assets/portraits/eder_-_milton.png')} ); 
            console.log('trying to load: eddie_peligro'); imageList.push({ fileName:'eddie_peligro.png', imgSrc: require('../assets/portraits/eddie_peligro.png')} ); 
            console.log('trying to load: jesica_cutler'); imageList.push({ fileName:'jesica_cutler.png', imgSrc: require('../assets/portraits/jesica_cutler.png')} ); 
            console.log('trying to load: yayita_-_carlos'); imageList.push({ fileName:'yayita_-_carlos.png', imgSrc: require('../assets/portraits/yayita_-_carlos.png')} ); 
            console.log('trying to load: jared_-_nicole'); imageList.push({ fileName:'jared_-_nicole.png', imgSrc: require('../assets/portraits/jared_-_nicole.png')} ); 
            console.log('trying to load: damilola_elegbede'); imageList.push({ fileName:'damilola_elegbede.png', imgSrc: require('../assets/portraits/damilola_elegbede.png')} ); 
            console.log('trying to load: watson_saintsulne'); imageList.push({ fileName:'watson_saintsulne.png', imgSrc: require('../assets/portraits/watson_saintsulne.png')} ); 
            console.log('trying to load: jenny_pham'); imageList.push({ fileName:'jenny_pham.png', imgSrc: require('../assets/portraits/jenny_pham.png')} ); 
            console.log('trying to load: johan_-_alyssa'); imageList.push({ fileName:'johan_-_alyssa.png', imgSrc: require('../assets/portraits/johan_-_alyssa.png')} ); 
            console.log('trying to load: jorge_-_indira'); imageList.push({ fileName:'jorge_-_indira.png', imgSrc: require('../assets/portraits/jorge_-_indira.png')} ); 
            console.log('trying to load: luan_-_adriana'); imageList.push({ fileName:'luan_-_adriana.png', imgSrc: require('../assets/portraits/luan_-_adriana.png')} ); 
            console.log('trying to load: maissaa_bachir'); imageList.push({ fileName:'maissaa_bachir.png', imgSrc: require('../assets/portraits/maissaa_bachir.png')} ); 
            console.log('trying to load: sisy_ayala'); imageList.push({ fileName:'sisy_ayala.png', imgSrc: require('../assets/portraits/sisy_ayala.png')} ); 
            console.log('trying to load: rafa_gonzalez'); imageList.push({ fileName:'rafa_gonzalez.png', imgSrc: require('../assets/portraits/rafa_gonzalez.png')} ); 
            console.log('trying to load: bachata_denver'); imageList.push({ fileName:'bachata_denver.png', imgSrc: require('../assets/portraits/bachata_denver.png')} ); 
            console.log('trying to load: kebrina_dejesus'); imageList.push({ fileName:'kebrina_dejesus.png', imgSrc: require('../assets/portraits/kebrina_dejesus.png')} ); 
            console.log('trying to load: raul_-_delia'); imageList.push({ fileName:'raul_-_delia.png', imgSrc: require('../assets/portraits/raul_-_delia.png')} ); 
            console.log('trying to load: luisa_-_paulo'); imageList.push({ fileName:'luisa_-_paulo.png', imgSrc: require('../assets/portraits/luisa_-_paulo.png')} ); 
            console.log('trying to load: serena_spears'); imageList.push({ fileName:'serena_spears.png', imgSrc: require('../assets/portraits/serena_spears.png')} ); 
            console.log('trying to load: colorado_dancesport'); imageList.push({ fileName:'colorado_dancesport.png', imgSrc: require('../assets/portraits/colorado_dancesport.png')} ); 
            console.log('trying to load: jk_dance_company'); imageList.push({ fileName:'jk_dance_company.png', imgSrc: require('../assets/portraits/jk_dance_company.png')} ); 
            console.log('trying to load: natasha_tia'); imageList.push({ fileName:'natasha_tia.png', imgSrc: require('../assets/portraits/natasha_tia.png')} ); 
            console.log('trying to load: bianca_chapman'); imageList.push({ fileName:'bianca_chapman.png', imgSrc: require('../assets/portraits/bianca_chapman.png')} ); 
            console.log('trying to load: alex_-_desiree'); imageList.push({ fileName:'alex_-_desiree.png', imgSrc: require('../assets/portraits/alex_-_desiree.png')} ); 
            console.log('trying to load: jsquared'); imageList.push({ fileName:'jsquared.png', imgSrc: require('../assets/portraits/jsquared.png')} ); 
            console.log('trying to load: tania_cannarsa'); imageList.push({ fileName:'tania_cannarsa.png', imgSrc: require('../assets/portraits/tania_cannarsa.png')} ); 
            console.log('trying to load: gustavo_-_ayane'); imageList.push({ fileName:'gustavo_-_ayane.png', imgSrc: require('../assets/portraits/gustavo_-_ayane.png')} ); 
            console.log('trying to load: casino_stars'); imageList.push({ fileName:'casino_stars.png', imgSrc: require('../assets/portraits/casino_stars.png')} ); 
            console.log('trying to load: jahaira_-_angelica'); imageList.push({ fileName:'jahaira_-_angelica.png', imgSrc: require('../assets/portraits/jahaira_-_angelica.png')} ); 
            console.log('trying to load: lawrence_-_jewel'); imageList.push({ fileName:'lawrence_-_jewel.png', imgSrc: require('../assets/portraits/lawrence_-_jewel.png')} ); 
            console.log('trying to load: kiki_elsilencio'); imageList.push({ fileName:'kiki_elsilencio.png', imgSrc: require('../assets/portraits/kiki_elsilencio.png')} ); 
            console.log('trying to load: benny_-_ashley'); imageList.push({ fileName:'benny_-_ashley.png', imgSrc: require('../assets/portraits/benny_-_ashley.png')} ); 
            console.log('trying to load: kingsmen'); imageList.push({ fileName:'kingsmen.png', imgSrc: require('../assets/portraits/kingsmen.png')} ); 
            console.log('trying to load: sandra_-_zach'); imageList.push({ fileName:'sandra_-_zach.png', imgSrc: require('../assets/portraits/sandra_-_zach.png')} ); 
            console.log('trying to load: christopher_webster'); imageList.push({ fileName:'christopher_webster.png', imgSrc: require('../assets/portraits/christopher_webster.png')} ); 
            console.log('trying to load: edwin_-_ahtoy'); imageList.push({ fileName:'edwin_-_ahtoy.png', imgSrc: require('../assets/portraits/edwin_-_ahtoy.png')} ); 
            console.log('trying to load: joseal'); imageList.push({ fileName:'joseal.png', imgSrc: require('../assets/portraits/joseal.png')} ); 
            console.log('trying to load: celeste_williamson'); imageList.push({ fileName:'celeste_williamson.png', imgSrc: require('../assets/portraits/celeste_williamson.png')} ); 
            console.log('trying to load: iroko'); imageList.push({ fileName:'iroko.png', imgSrc: require('../assets/portraits/iroko.png')} ); 
            console.log('trying to load: eric_-_marcela'); imageList.push({ fileName:'eric_-_marcela.png', imgSrc: require('../assets/portraits/eric_-_marcela.png')} ); 
            console.log('trying to load: gio_-_gaby'); imageList.push({ fileName:'gio_-_gaby.png', imgSrc: require('../assets/portraits/gio_-_gaby.png')} ); 
            console.log('trying to load: rna_dance_company'); imageList.push({ fileName:'rna_dance_company.png', imgSrc: require('../assets/portraits/rna_dance_company.png')} ); 
            console.log('trying to load: cam'); imageList.push({ fileName:'cam.png', imgSrc: require('../assets/portraits/cam.png')} ); 
            console.log('trying to load: adrian_tenorio'); imageList.push({ fileName:'adrian_tenorio.png', imgSrc: require('../assets/portraits/adrian_tenorio.png')} ); 
            console.log('trying to load: sebastian_-_jocelyn'); imageList.push({ fileName:'sebastian_-_jocelyn.png', imgSrc: require('../assets/portraits/sebastian_-_jocelyn.png')} ); 
            console.log('trying to load: dejon_-_clo'); imageList.push({ fileName:'dejon_-_clo.png', imgSrc: require('../assets/portraits/dejon_-_clo.png')} ); 
            console.log('trying to load: karen_-_ricardo'); imageList.push({ fileName:'karen_-_ricardo.png', imgSrc: require('../assets/portraits/karen_-_ricardo.png')} ); 
            console.log('trying to load: saulo_-_jasmin'); imageList.push({ fileName:'saulo_-_jasmin.png', imgSrc: require('../assets/portraits/saulo_-_jasmin.png')} ); 
            console.log('trying to load: oscar_martinez'); imageList.push({ fileName:'oscar_martinez.png', imgSrc: require('../assets/portraits/oscar_martinez.png')} ); 
            console.log('trying to load: adriana_-_jorge'); imageList.push({ fileName:'adriana_-_jorge.png', imgSrc: require('../assets/portraits/adriana_-_jorge.png')} ); 
            console.log('trying to load: chris_-_alexus'); imageList.push({ fileName:'chris_-_alexus.png', imgSrc: require('../assets/portraits/chris_-_alexus.png')} ); 
            console.log('trying to load: marc_-_rose'); imageList.push({ fileName:'marc_-_rose.png', imgSrc: require('../assets/portraits/marc_-_rose.png')} ); 
            console.log('trying to load: ataca_-_alemana'); imageList.push({ fileName:'ataca_-_alemana.png', imgSrc: require('../assets/portraits/ataca_-_alemana.png')} ); 
            console.log('trying to load: jessica_quiles'); imageList.push({ fileName:'jessica_quiles.png', imgSrc: require('../assets/portraits/jessica_quiles.png')} ); 
            console.log('trying to load: jovan_casanova'); imageList.push({ fileName:'jovan_casanova.png', imgSrc: require('../assets/portraits/jovan_casanova.png')} ); 
            console.log('trying to load: fuego_-_hielo'); imageList.push({ fileName:'fuego_-_hielo.png', imgSrc: require('../assets/portraits/fuego_-_hielo.png')} ); 
            console.log('trying to load: rafael_-_carine'); imageList.push({ fileName:'rafael_-_carine.png', imgSrc: require('../assets/portraits/rafael_-_carine.png')} ); 
            console.log('trying to load: kate_rodriguez'); imageList.push({ fileName:'kate_rodriguez.png', imgSrc: require('../assets/portraits/kate_rodriguez.png')} ); 
            console.log('trying to load: marisol_blanco'); imageList.push({ fileName:'marisol_blanco.png', imgSrc: require('../assets/portraits/marisol_blanco.png')} ); 
            console.log('trying to load: adolfo_-_tania'); imageList.push({ fileName:'adolfo_-_tania.png', imgSrc: require('../assets/portraits/adolfo_-_tania.png')} ); 
            console.log('trying to load: chelsey_owen'); imageList.push({ fileName:'chelsey_owen.png', imgSrc: require('../assets/portraits/chelsey_owen.png')} ); 
            console.log('trying to load: desi_caliente'); imageList.push({ fileName:'desi_caliente.png', imgSrc: require('../assets/portraits/desi_caliente.png')} ); 
            console.log('trying to load: bachatito'); imageList.push({ fileName:'bachatito.png', imgSrc: require('../assets/portraits/bachatito.png')} ); 
            console.log('trying to load: devon_near-hill'); imageList.push({ fileName:'devon_near-hill.png', imgSrc: require('../assets/portraits/devon_near-hill.png')} ); 
            console.log('trying to load: daniel_-_kathryn'); imageList.push({ fileName:'daniel_-_kathryn.png', imgSrc: require('../assets/portraits/daniel_-_kathryn.png')} ); 
            console.log('trying to load: rose_turuka'); imageList.push({ fileName:'rose_turuka.png', imgSrc: require('../assets/portraits/rose_turuka.png')} ); 
            console.log('trying to load: alemana'); imageList.push({ fileName:'alemana.png', imgSrc: require('../assets/portraits/alemana.png')} ); 
            console.log('trying to load: tito_garcia'); imageList.push({ fileName:'tito_garcia.png', imgSrc: require('../assets/portraits/tito_garcia.png')} ); 
            console.log('trying to load: colorado_ballet'); imageList.push({ fileName:'colorado_ballet.png', imgSrc: require('../assets/portraits/colorado_ballet.png')} ); 
            console.log('trying to load: rachel_-_hunter'); imageList.push({ fileName:'rachel_-_hunter.png', imgSrc: require('../assets/portraits/rachel_-_hunter.png')} ); 
            console.log('trying to load: diego_-_yurley'); imageList.push({ fileName:'diego_-_yurley.png', imgSrc: require('../assets/portraits/diego_-_yurley.png')} ); 
            console.log('trying to load: ebonie_lee'); imageList.push({ fileName:'ebonie_lee.png', imgSrc: require('../assets/portraits/ebonie_lee.png')} ); 
            console.log('trying to load: aris_gingundo'); imageList.push({ fileName:'aris_gingundo.png', imgSrc: require('../assets/portraits/aris_gingundo.png')} ); 
        
        } catch (error) {
            console.log('Could not load asset: dr_brian_hernandez');
        };

        //now load companies
        try {
            
            console.log('trying to load: and_academic_network_of_dance'); imageList.push({ fileName:'../assets/logos/and_academic_network_of_dance.png', imgSrc: require('../assets/logos/and_academic_network_of_dance.png')} );
            console.log('trying to load: somos_dance_studio'); imageList.push({ fileName:'somos_dance_studio.png', imgSrc: require('../assets/logos/somos_dance_studio.png')} );
        } catch (error) {
            console.log('Could not load asset: dr_brian_hernandez');
        };
    }
}

export default AssetLoader;
