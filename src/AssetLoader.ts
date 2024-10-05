
class AssetLoader {
    private static _instance: AssetLoader;
    public static get instance() { if (!this._instance) { this._instance = new AssetLoader(); } return this._instance; }

    public loadAssets(imageList: Array<{ fileName, imgSrc }>) {
        try {
       
       
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
