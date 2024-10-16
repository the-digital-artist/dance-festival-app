
class AssetLoader {
    private static _instance: AssetLoader;
    public static get instance() { if (!this._instance) { this._instance = new AssetLoader(); } return this._instance; }

    public loadAssets(imageList: Object) {
        try {
            imageList['carlos_-_susan'] = { fileName:'carlos_-_susan.png', imgSrc: require('../assets/portraits/carlos_-_susan.png')}; 
            imageList['brandon_-_michelle'] = { fileName:'brandon_-_michelle.png', imgSrc: require('../assets/portraits/brandon_-_michelle.png')}; 
            imageList['el_tiguere_-_bianca'] = { fileName:'el_tiguere_-_bianca.png', imgSrc: require('../assets/portraits/el_tiguere_-_bianca.png')}; 
            imageList['diane_page'] = { fileName:'diane_page.png', imgSrc: require('../assets/portraits/diane_page.png')}; 
            imageList['latisha_hardy'] = { fileName:'latisha_hardy.png', imgSrc: require('../assets/portraits/latisha_hardy.png')}; 
            imageList['devon_near-hill'] = { fileName:'devon_near-hill.png', imgSrc: require('../assets/portraits/devon_near-hill.png')}; 
            imageList['daniel_agosto'] = { fileName:'daniel_agosto.png', imgSrc: require('../assets/portraits/daniel_agosto.png')}; 
            imageList['watson_saintsulne'] = { fileName:'watson_saintsulne.png', imgSrc: require('../assets/portraits/watson_saintsulne.png')}; 
            imageList['jesica_cutler'] = { fileName:'jesica_cutler.png', imgSrc: require('../assets/portraits/jesica_cutler.png')}; 
            imageList['nathan_hook'] = { fileName:'nathan_hook.png', imgSrc: require('../assets/portraits/nathan_hook.png')}; 
            imageList['sebastian_-_jocelyn'] = { fileName:'sebastian_-_jocelyn.png', imgSrc: require('../assets/portraits/sebastian_-_jocelyn.png')}; 
            imageList['eder_-_milton'] = { fileName:'eder_-_milton.png', imgSrc: require('../assets/portraits/eder_-_milton.png')}; 
            imageList['eddie_peligro'] = { fileName:'eddie_peligro.png', imgSrc: require('../assets/portraits/eddie_peligro.png')}; 
            imageList['rachel_-_hunter'] = { fileName:'rachel_-_hunter.png', imgSrc: require('../assets/portraits/rachel_-_hunter.png')}; 
            imageList['yayita_-_carlos'] = { fileName:'yayita_-_carlos.png', imgSrc: require('../assets/portraits/yayita_-_carlos.png')}; 
            imageList['jared_-_nicole'] = { fileName:'jared_-_nicole.png', imgSrc: require('../assets/portraits/jared_-_nicole.png')}; 
            imageList['damilola_elegbede'] = { fileName:'damilola_elegbede.png', imgSrc: require('../assets/portraits/damilola_elegbede.png')}; 
            imageList['bachata_denver'] = { fileName:'bachata_denver.png', imgSrc: require('../assets/portraits/bachata_denver.png')}; 
            imageList['jenny_pham'] = { fileName:'jenny_pham.png', imgSrc: require('../assets/portraits/jenny_pham.png')}; 
            imageList['johan_-_alyssa'] = { fileName:'johan_-_alyssa.png', imgSrc: require('../assets/portraits/johan_-_alyssa.png')}; 
            imageList['jorge_-_indira'] = { fileName:'jorge_-_indira.png', imgSrc: require('../assets/portraits/jorge_-_indira.png')}; 
            imageList['luan_-_adriana'] = { fileName:'luan_-_adriana.png', imgSrc: require('../assets/portraits/luan_-_adriana.png')}; 
            imageList['maissaa_bachir'] = { fileName:'maissaa_bachir.png', imgSrc: require('../assets/portraits/maissaa_bachir.png')}; 
            imageList['sisy_ayala'] = { fileName:'sisy_ayala.png', imgSrc: require('../assets/portraits/sisy_ayala.png')}; 
            imageList['rafa_gonzalez'] = { fileName:'rafa_gonzalez.png', imgSrc: require('../assets/portraits/rafa_gonzalez.png')}; 
            imageList['lorena_charry'] = { fileName:'lorena_charry.png', imgSrc: require('../assets/portraits/lorena_charry.png')}; 
            imageList['kebrina_dejesus'] = { fileName:'kebrina_dejesus.png', imgSrc: require('../assets/portraits/kebrina_dejesus.png')}; 
            imageList['raul_-_delia'] = { fileName:'raul_-_delia.png', imgSrc: require('../assets/portraits/raul_-_delia.png')}; 
            imageList['luisa_-_paulo'] = { fileName:'luisa_-_paulo.png', imgSrc: require('../assets/portraits/luisa_-_paulo.png')}; 
            imageList['serena_spears'] = { fileName:'serena_spears.png', imgSrc: require('../assets/portraits/serena_spears.png')}; 
            imageList['colorado_dancesport'] = { fileName:'colorado_dancesport.png', imgSrc: require('../assets/portraits/colorado_dancesport.png')}; 
            imageList['jk_dance_company'] = { fileName:'jk_dance_company.png', imgSrc: require('../assets/portraits/jk_dance_company.png')}; 
            imageList['lawrence_-_jewel'] = { fileName:'lawrence_-_jewel.png', imgSrc: require('../assets/portraits/lawrence_-_jewel.png')}; 
            imageList['bianca_chapman'] = { fileName:'bianca_chapman.png', imgSrc: require('../assets/portraits/bianca_chapman.png')}; 
            imageList['alex_-_desiree'] = { fileName:'alex_-_desiree.png', imgSrc: require('../assets/portraits/alex_-_desiree.png')}; 
            imageList['jsquared'] = { fileName:'jsquared.png', imgSrc: require('../assets/portraits/jsquared.png')}; 
            imageList['tania_cannarsa'] = { fileName:'tania_cannarsa.png', imgSrc: require('../assets/portraits/tania_cannarsa.png')}; 
            imageList['gustavo_-_ayane'] = { fileName:'gustavo_-_ayane.png', imgSrc: require('../assets/portraits/gustavo_-_ayane.png')}; 
            imageList['casino_stars'] = { fileName:'casino_stars.png', imgSrc: require('../assets/portraits/casino_stars.png')}; 
            imageList['jahaira_-_angelica'] = { fileName:'jahaira_-_angelica.png', imgSrc: require('../assets/portraits/jahaira_-_angelica.png')}; 
            imageList['gio_-_gaby'] = { fileName:'gio_-_gaby.png', imgSrc: require('../assets/portraits/gio_-_gaby.png')}; 
            imageList['kiki_elsilencio'] = { fileName:'kiki_elsilencio.png', imgSrc: require('../assets/portraits/kiki_elsilencio.png')}; 
            imageList['benny_-_ashley'] = { fileName:'benny_-_ashley.png', imgSrc: require('../assets/portraits/benny_-_ashley.png')}; 
            imageList['kingsmen'] = { fileName:'kingsmen.png', imgSrc: require('../assets/portraits/kingsmen.png')}; 
            imageList['sandra_-_zach'] = { fileName:'sandra_-_zach.png', imgSrc: require('../assets/portraits/sandra_-_zach.png')}; 
            imageList['christopher_webster'] = { fileName:'christopher_webster.png', imgSrc: require('../assets/portraits/christopher_webster.png')}; 
            imageList['edwin_-_ahtoy'] = { fileName:'edwin_-_ahtoy.png', imgSrc: require('../assets/portraits/edwin_-_ahtoy.png')}; 
            imageList['joseal'] = { fileName:'joseal.png', imgSrc: require('../assets/portraits/joseal.png')}; 
            imageList['celeste_williamson'] = { fileName:'celeste_williamson.png', imgSrc: require('../assets/portraits/celeste_williamson.png')}; 
            imageList['jessica_quiles'] = { fileName:'jessica_quiles.png', imgSrc: require('../assets/portraits/jessica_quiles.png')}; 
            imageList['yvonne_-_rudy'] = { fileName:'yvonne_-_rudy.png', imgSrc: require('../assets/portraits/yvonne_-_rudy.png')}; 
            imageList['rna_dance_company'] = { fileName:'rna_dance_company.png', imgSrc: require('../assets/portraits/rna_dance_company.png')}; 
            imageList['ernesto_-_denisse'] = { fileName:'ernesto_-_denisse.png', imgSrc: require('../assets/portraits/ernesto_-_denisse.png')}; 
            imageList['cam'] = { fileName:'cam.png', imgSrc: require('../assets/portraits/cam.png')}; 
            imageList['adrian_tenorio'] = { fileName:'adrian_tenorio.png', imgSrc: require('../assets/portraits/adrian_tenorio.png')}; 
            imageList['dejon_-_clo'] = { fileName:'dejon_-_clo.png', imgSrc: require('../assets/portraits/dejon_-_clo.png')}; 
            imageList['karen_-_ricardo'] = { fileName:'karen_-_ricardo.png', imgSrc: require('../assets/portraits/karen_-_ricardo.png')}; 
            imageList['saulo_-_jasmin'] = { fileName:'saulo_-_jasmin.png', imgSrc: require('../assets/portraits/saulo_-_jasmin.png')}; 
            imageList['oscar_martinez'] = { fileName:'oscar_martinez.png', imgSrc: require('../assets/portraits/oscar_martinez.png')}; 
            imageList['adriana_-_jorge'] = { fileName:'adriana_-_jorge.png', imgSrc: require('../assets/portraits/adriana_-_jorge.png')}; 
            imageList['chris_-_alexus'] = { fileName:'chris_-_alexus.png', imgSrc: require('../assets/portraits/chris_-_alexus.png')}; 
            imageList['marc_-_rose'] = { fileName:'marc_-_rose.png', imgSrc: require('../assets/portraits/marc_-_rose.png')}; 
            imageList['ataca_-_alemana'] = { fileName:'ataca_-_alemana.png', imgSrc: require('../assets/portraits/ataca_-_alemana.png')}; 
            imageList['jovan_casanova'] = { fileName:'jovan_casanova.png', imgSrc: require('../assets/portraits/jovan_casanova.png')}; 
            imageList['fuego_-_hielo'] = { fileName:'fuego_-_hielo.png', imgSrc: require('../assets/portraits/fuego_-_hielo.png')}; 
            imageList['rafael_-_carine'] = { fileName:'rafael_-_carine.png', imgSrc: require('../assets/portraits/rafael_-_carine.png')}; 
            imageList['natasha_tia'] = { fileName:'natasha_tia.png', imgSrc: require('../assets/portraits/natasha_tia.png')}; 
            imageList['kate_rodriguez'] = { fileName:'kate_rodriguez.png', imgSrc: require('../assets/portraits/kate_rodriguez.png')}; 
            imageList['marisol_blanco'] = { fileName:'marisol_blanco.png', imgSrc: require('../assets/portraits/marisol_blanco.png')}; 
            imageList['adolfo_-_tania'] = { fileName:'adolfo_-_tania.png', imgSrc: require('../assets/portraits/adolfo_-_tania.png')}; 
            imageList['chelsey_owen'] = { fileName:'chelsey_owen.png', imgSrc: require('../assets/portraits/chelsey_owen.png')}; 
            imageList['aris_gingundo'] = { fileName:'aris_gingundo.png', imgSrc: require('../assets/portraits/aris_gingundo.png')}; 
            imageList['desi_caliente'] = { fileName:'desi_caliente.png', imgSrc: require('../assets/portraits/desi_caliente.png')}; 
            imageList['tito_garcia'] = { fileName:'tito_garcia.png', imgSrc: require('../assets/portraits/tito_garcia.png')}; 
            imageList['rose_turuka'] = { fileName:'rose_turuka.png', imgSrc: require('../assets/portraits/rose_turuka.png')}; 
            imageList['jazmyne_lewis'] = { fileName:'jazmyne_lewis.png', imgSrc: require('../assets/portraits/jazmyne_lewis.png')}; 
            imageList['bachatito'] = { fileName:'bachatito.png', imgSrc: require('../assets/portraits/bachatito.png')}; 
            imageList['alemana'] = { fileName:'alemana.png', imgSrc: require('../assets/portraits/alemana.png')}; 
            imageList['daniel_-_kathryn'] = { fileName:'daniel_-_kathryn.png', imgSrc: require('../assets/portraits/daniel_-_kathryn.png')}; 
            imageList['colorado_ballet'] = { fileName:'colorado_ballet.png', imgSrc: require('../assets/portraits/colorado_ballet.png')}; 
            imageList['diego_-_yurley'] = { fileName:'diego_-_yurley.png', imgSrc: require('../assets/portraits/diego_-_yurley.png')}; 
            imageList['ebonie_lee'] = { fileName:'ebonie_lee.png', imgSrc: require('../assets/portraits/ebonie_lee.png')}; 
            imageList['eric_-_marcela'] = { fileName:'eric_-_marcela.png', imgSrc: require('../assets/portraits/eric_-_marcela.png')}; 
            
     
        } catch (error) {
            console.log('Could not load asset');
        };

        //now load companies
        try {
            imageList['logo_somos_dance_studio'] = { fileName:'logo_somos_dance_studio.png', imgSrc: require('../assets/logos/logo_somos_dance_studio.png')}; 
            imageList['logo_and_academic_network_of_dance'] = { fileName:'logo_and_academic_network_of_dance.png', imgSrc: require('../assets/logos/logo_and_academic_network_of_dance.png')}; 
            imageList['logo_dejon_clo'] = { fileName:'logo_dejon_clo.png', imgSrc: require('../assets/logos/logo_dejon_clo.png')}; 
            imageList['logo_em_virtual'] = { fileName:'logo_em_virtual.png', imgSrc: require('../assets/logos/logo_em_virtual.png')}; 
            
    } catch (error) {
            console.log('Could not load asset');
        };
    }
}

export default AssetLoader;
