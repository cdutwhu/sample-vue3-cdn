import { getEmitter } from './mitt.js'

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
            emitter.emit('from_app', mypen.value)
            console.log(mypen.value);
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