import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader'
import fontawesome from '@salesforce/resourceUrl/fontawesome'
export default class MemoryGameLwc extends LightningElement {

    isLibLoaded = false
    renderedCallback() {
        if(this.isLibLoaded === false) {
            loadStyle(this, fontawesome+'/fontawesome/css/font-awesome.min.css').then(() => {
                console.log("loaded succesfully")
            }).catch(error => {console.error(error)})
        
            this.isLibLoaded = true
        }
    }
}