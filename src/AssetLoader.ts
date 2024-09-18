
class AssetLoader {
    private static _instance: AssetLoader;
    public static get instance() { if (!this._instance) { this._instance = new AssetLoader(); } return this._instance; }

    public loadAssets(imageList: Array<{ fileName, imgSrc }>) {
        try {
  
            console.log('trying to load: debbie_pacheco'); imageList.push({ fileName:'debbie_pacheco.png', imgSrc: require('../assets/portraits/debbie_pacheco.png')} ); 
            console.log('trying to load: gautam_mulchandani'); imageList.push({ fileName:'gautam_mulchandani.png', imgSrc: require('../assets/portraits/gautam_mulchandani.png')} ); 
            console.log('trying to load: hannah_knapp'); imageList.push({ fileName:'hannah_knapp.png', imgSrc: require('../assets/portraits/hannah_knapp.png')} ); 
            console.log('trying to load: kinjal_shah'); imageList.push({ fileName:'kinjal_shah.png', imgSrc: require('../assets/portraits/kinjal_shah.png')} ); 
            console.log('trying to load: lars_kallman'); imageList.push({ fileName:'lars_kallman.png', imgSrc: require('../assets/portraits/lars_kallman.png')} ); 
            console.log('trying to load: laura_schadler'); imageList.push({ fileName:'laura_schadler.png', imgSrc: require('../assets/portraits/laura_schadler.png')} ); 
            console.log('trying to load: michelle_emmanuelle'); imageList.push({ fileName:'michelle_emmanuelle.png', imgSrc: require('../assets/portraits/michelle_emmanuelle.png')} ); 
            console.log('trying to load: nitin_garg'); imageList.push({ fileName:'nitin_garg.png', imgSrc: require('../assets/portraits/nitin_garg.png')} ); 
            console.log('trying to load: shereel_washington'); imageList.push({ fileName:'shereel_washington.png', imgSrc: require('../assets/portraits/shereel_washington.png')} ); 
            console.log('trying to load: shundo_david_haye'); imageList.push({ fileName:'shundo_david_haye.png', imgSrc: require('../assets/portraits/shundo_david_haye.png')} ); 
            console.log('trying to load: sophia_lin'); imageList.push({ fileName:'sophia_lin.png', imgSrc: require('../assets/portraits/sophia_lin.png')} ); 
            console.log('trying to load: marc_morozumi'); imageList.push({ fileName:'marc_morozumi.png', imgSrc: require('../assets/portraits/marc_morozumi.png')} ); 
            console.log('trying to load: adrien_joyner'); imageList.push({ fileName:'adrien_joyner.png', imgSrc: require('../assets/portraits/adrien_joyner.png')} ); 
            console.log('trying to load: alex_castro'); imageList.push({ fileName:'alex_castro.png', imgSrc: require('../assets/portraits/alex_castro.png')} ); 
            console.log('trying to load: alexandria_nichandros'); imageList.push({ fileName:'alexandria_nichandros.png', imgSrc: require('../assets/portraits/alexandria_nichandros.png')} ); 
            console.log('trying to load: bex_mui'); imageList.push({ fileName:'bex_mui.png', imgSrc: require('../assets/portraits/bex_mui.png')} ); 
            console.log('trying to load: david_khalili'); imageList.push({ fileName:'david_khalili.png', imgSrc: require('../assets/portraits/david_khalili.png')} ); 
            console.log('trying to load: den_bremond'); imageList.push({ fileName:'den_bremond.png', imgSrc: require('../assets/portraits/den_bremond.png')} ); 
            console.log('trying to load: dhiraj_korwani'); imageList.push({ fileName:'dhiraj_korwani.png', imgSrc: require('../assets/portraits/dhiraj_korwani.png')} ); 
            console.log('trying to load: jeanna_eichenbaum'); imageList.push({ fileName:'jeanna_eichenbaum.png', imgSrc: require('../assets/portraits/jeanna_eichenbaum.png')} ); 
            console.log('trying to load: jerry_cuffey'); imageList.push({ fileName:'jerry_cuffey.png', imgSrc: require('../assets/portraits/jerry_cuffey.png')} ); 
            console.log('trying to load: ki_charles'); imageList.push({ fileName:'ki_charles.png', imgSrc: require('../assets/portraits/ki_charles.png')} ); 
            console.log('trying to load: kramer_dahl'); imageList.push({ fileName:'kramer_dahl.png', imgSrc: require('../assets/portraits/kramer_dahl.png')} ); 
            console.log('trying to load: lydia_real'); imageList.push({ fileName:'lydia_real.png', imgSrc: require('../assets/portraits/lydia_real.png')} ); 
            console.log('trying to load: meghan_johnson'); imageList.push({ fileName:'meghan_johnson.png', imgSrc: require('../assets/portraits/meghan_johnson.png')} ); 
            console.log('trying to load: olivier_de_wulf'); imageList.push({ fileName:'olivier_de_wulf.png', imgSrc: require('../assets/portraits/olivier_de_wulf.png')} ); 
            console.log('trying to load: phil_deem'); imageList.push({ fileName:'phil_deem.png', imgSrc: require('../assets/portraits/phil_deem.png')} ); 
            console.log('trying to load: susan_sullivan'); imageList.push({ fileName:'susan_sullivan.png', imgSrc: require('../assets/portraits/susan_sullivan.png')} ); 
            console.log('trying to load: tijanna_eaton'); imageList.push({ fileName:'tijanna_eaton.png', imgSrc: require('../assets/portraits/tijanna_eaton.png')} ); 
            console.log('trying to load: dr_brian_hernandez'); imageList.push({ fileName:'dr_brian_hernandez.png', imgSrc: require('../assets/portraits/dr_brian_hernandez.png')} ); 
            console.log('trying to load: christine_lu_singh'); imageList.push({ fileName:'christine_lu_singh.png', imgSrc: require('../assets/portraits/christine_lu_singh.png')} ); 
            console.log('trying to load: chuck_rosenthal'); imageList.push({ fileName:'chuck_rosenthal.png', imgSrc: require('../assets/portraits/chuck_rosenthal.png')} ); 
            console.log('trying to load: emiko_oye'); imageList.push({ fileName:'emiko_oye.png', imgSrc: require('../assets/portraits/emiko_oye.png')} ); 
            console.log('trying to load: erynne_elkins'); imageList.push({ fileName:'erynne_elkins.png', imgSrc: require('../assets/portraits/erynne_elkins.png')} ); 
            console.log('trying to load: gogo_zoger'); imageList.push({ fileName:'gogo_zoger.png', imgSrc: require('../assets/portraits/gogo_zoger.png')} ); 
            console.log('trying to load: kamelle_mills'); imageList.push({ fileName:'kamelle_mills.png', imgSrc: require('../assets/portraits/kamelle_mills.png')} ); 
            console.log('trying to load: mane'); imageList.push({ fileName:'mane.png', imgSrc: require('../assets/portraits/mane.png')} ); 
            console.log('trying to load: mirabai_warkulwiz'); imageList.push({ fileName:'mirabai_warkulwiz.png', imgSrc: require('../assets/portraits/mirabai_warkulwiz.png')} ); 
            console.log('trying to load: nirel_salazar'); imageList.push({ fileName:'nirel_salazar.png', imgSrc: require('../assets/portraits/nirel_salazar.png')} ); 
            console.log('trying to load: robert_bray'); imageList.push({ fileName:'robert_bray.png', imgSrc: require('../assets/portraits/robert_bray.png')} ); 
            console.log('trying to load: suzannah_weening'); imageList.push({ fileName:'suzannah_weening.png', imgSrc: require('../assets/portraits/suzannah_weening.png')} ); 
            console.log('trying to load: taylor_bowman'); imageList.push({ fileName:'taylor_bowman.png', imgSrc: require('../assets/portraits/taylor_bowman.png')} ); 
            console.log('trying to load: tendwell_collective'); imageList.push({ fileName:'tendwell_collective.png', imgSrc: require('../assets/portraits/tendwell_collective.png')} ); 
            console.log('trying to load: tina_pham'); imageList.push({ fileName:'tina_pham.png', imgSrc: require('../assets/portraits/tina_pham.png')} ); 
            console.log('trying to load: andrea_stern'); imageList.push({ fileName:'andrea_stern.png', imgSrc: require('../assets/portraits/andrea_stern.png')} ); 
            console.log('trying to load: nicola_bosco-alvarez'); imageList.push({ fileName:'nicola_bosco-alvarez.png', imgSrc: require('../assets/portraits/nicola_bosco-alvarez.png')} );       
            console.log('trying to load: nick_ward_-_timothy_hampton'); imageList.push({ fileName:'nick_ward_-_timothy_hampton.png', imgSrc: require('../assets/portraits/nick_ward_-_timothy_hampton.png')} ); 
        } catch (error) {
            console.log('Could not load asset: dr_brian_hernandez');
        };
    }
}

export default AssetLoader;
