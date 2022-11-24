import * as api from '../api.js';

export const applyHandler =(ctx) => {
    let butonApply = document.getElementById('apply-btn');
    butonApply.addEventListener('click',(e) => {
        e.preventDefault();
        console.log('here!')
        
    })
   

}