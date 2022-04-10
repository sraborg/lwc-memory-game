import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader'
import fontawesome from '@salesforce/resourceUrl/fontawesome'
export default class MemoryGameLwc extends LightningElement {

    isLibLoaded = false
    openedCards = []
    matchedCard = []
    moves=0
    cards = [
        {id:1, listClass:"card", type:'diamond', icon:'fa fa-diamond'},
        {id:2, listClass:"card", type:'plane', icon:'fa fa-paper-plane-o'},
        {id:3, listClass:"card", type:'anchor', icon:'fa fa-anchor'},
        {id:4, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:5, listClass:"card", type:'cube', icon:'fa fa-cube'},
        {id:6, listClass:"card", type:'anchor', icon:'fa fa-anchor'},
        {id:7, listClass:"card", type:'leaf', icon:'fa fa-leaf'},
        {id:8, listClass:"card", type:'bicycle', icon:'fa fa-bicycle'},
        {id:9, listClass:"card", type:'diamond', icon:'fa fa-diamond'},
        {id:10, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:11, listClass:"card", type:'leaf', icon:'fa fa-leaf'},
        {id:12, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:13, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:14, listClass:"card", type:'bicycle', icon:'fa fa-bicycle'},
        {id:15, listClass:"card", type:'plane', icon:'fa fa-paper-plane-o'},
        {id:16, listClass:"card", type:'cube', icon:'fa fa-cube'},
    ]

    renderedCallback() {
        if(this.isLibLoaded === false) {
            loadStyle(this, fontawesome+'/fontawesome/css/font-awesome.min.css').then(() => {
                console.log("loaded succesfully")
            }).catch(error => {console.error(error)})
        
            this.isLibLoaded = true
        }
    }

    displayCard(event){
        let currCard = event.target
        currCard.classList.add("open", "show", "disabled")
        this.openedCards = this.openedCards.concat(currCard)
        const len = this.openedCards.length
        if(len === 2) {
            this.moves = this.moves + 1
            if(this.openedCards[0].type === this.openedCards[1].type) {
                this.matchedCard = this.matchedCard.concat(this.openedCards[0], this.openedCards[1])
                this.matched()
            } else {
                this.unmatched()
            }
        }
    }

    matched() {
        this.openedCards[0].classList.add("match", "disabled")
        this.openedCards[1].classList.add("match", "disabled")
        this.openedCards[0].classList.remove("show", "open")
        this.openedCards[1].classList.remove("show", "open")
        this.openedCards=[]
    }

    unmatched() {
        this.openedCards[0].classList.add("unmatched")
        this.openedCards[1].classList.add("unmatched")
        this.action('DISABLE')
        setTimeout(()=>{
            this.openedCards[0].classList.remove("show", "open", "unmatched")
            this.openedCards[1].classList.remove("show", "open", "unmatched")
            this.action('ENABLE')
            this.openedCards=[]
        }, 1100)
    }

    action(action) {
        let cards = this.template.querySelectorAll('.card')
        Array.from(cards).forEach(item => {
            if(action === 'ENABLE') {
                let isMatch = item.classList.contains('match')
                if(!isMatch){
                    item.classList.remove('disabled')
                }
            }
            if(action === 'DISABLE') {
                item.classList.add('disabled')
            }
        })
    }
}