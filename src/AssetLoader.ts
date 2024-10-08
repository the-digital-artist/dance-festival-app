
class AssetLoader {
    private static _instance: AssetLoader;
    public static get instance() { if (!this._instance) { this._instance = new AssetLoader(); } return this._instance; }

    public loadAssets(imageList: Array<{ fileName, imgSrc }>) {
        try {
            imageList.push({ fileName: 'osmani_segura.png', imgSrc: require('../assets/portraits/osmani_segura.png') });
            imageList.push({ fileName: 'laura_del_vecchio.png', imgSrc: require('../assets/portraits/laura_del_vecchio.png') });
            imageList.push({ fileName: 'seo_fernandez.png', imgSrc: require('../assets/portraits/seo_fernandez.png') });
            imageList.push({ fileName: 'yusimi_moya.png', imgSrc: require('../assets/portraits/yusimi_moya.png') });
            imageList.push({ fileName: 'addy_mendoza.png', imgSrc: require('../assets/portraits/addy_mendoza.png') });
            imageList.push({ fileName: 'yeni_molinet.png', imgSrc: require('../assets/portraits/yeni_molinet.png') });
            imageList.push({ fileName: 'yosniel_brunet.png', imgSrc: require('../assets/portraits/yosniel_brunet.png') });
            imageList.push({ fileName: 'yohan_fernandez.png', imgSrc: require('../assets/portraits/yohan_fernandez.png') });
            imageList.push({ fileName: 'elaine_runderkamp.png', imgSrc: require('../assets/portraits/elaine_runderkamp.png') });
            imageList.push({ fileName: 'helen_-_yago.png', imgSrc: require('../assets/portraits/helen_-_yago.png') });
            imageList.push({ fileName: 'sasha_phillips.png', imgSrc: require('../assets/portraits/sasha_phillips.png') });
            imageList.push({ fileName: 'ido_-_agnita.png', imgSrc: require('../assets/portraits/ido_-_agnita.png') });
            imageList.push({ fileName: 'jose_carlos.png', imgSrc: require('../assets/portraits/jose_carlos.png') });
            imageList.push({ fileName: 'edson_-_juan.png', imgSrc: require('../assets/portraits/edson_-_juan.png') });
            imageList.push({ fileName: 'oliwia_szewczak.png', imgSrc: require('../assets/portraits/oliwia_szewczak.png') });
        } catch (error) {
            console.log('Could not load asset: dr_brian_hernandez');
        };

        //now load companies
        try {

        } catch (error) {
            console.log('Could not load asset: dr_brian_hernandez');
        };
    }
}

export default AssetLoader;
