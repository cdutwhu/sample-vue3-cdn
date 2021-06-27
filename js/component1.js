import { getEmitter } from './mitt.js'
import { fetch_get } from './fetch.js'

let emitter = getEmitter();

export default {
    name: 'Test',

    setup() {
        const title = "Hello";
        let mypen = Vue.ref("");

        // listen to an event
        emitter.on('from_app1', e => {
            mypen.value = e;
            console.log('app received:', e);
        });

        // listen to all events
        // emitter.on('*', (type, e) => console.log(type, e));

        // fire an event
        // emitter.emit('foo', { a: 'b' })

        function fire() {

            let data = fetch_get('https://yesno.wtf/api');
            
            const fetchValue = async () => {
                const a = await data;
                emitter.emit('from_app', a.answer);
                console.log(a.answer);
                return a;
            };
            let a = fetchValue();
            console.log(`result is ${a}`)

            // emitter.emit('from_app', mypen.value);
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