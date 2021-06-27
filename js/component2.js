import { getEmitter } from './mitt.js'
import { fetch_get } from './fetch.js'

let emitter = getEmitter();

export default {
    name: 'Test1',

    setup() {
        const title = "Hello";
        let mypen = Vue.ref("");

        // listen to an event
        emitter.on('from_app', e => {
            mypen.value = e;
            console.log('app1 received:', e)
        });

        function fire(str) {

            let data = fetch_get('https://yesno.wtf/api');

            (async () => {
                const a = await data;
                emitter.emit('from_app1', a.answer);
                console.log(a.answer);
                return a;
            })();

            // emitter.emit('from_app1', mypen.value)
            // console.log(mypen.value);
        }

        return {
            title,
            mypen,
            fire,
        };
    },

    template: `      
        <h1>{{title}}{{mypen}}</h1>
        <input v-model="mypen" placeholder="input">
        <button class="mybutton" @click="fire"></button>      
    `,
};