import { Person } from '../types';

export class Devs {
    devs: Person[];
    constructor() {
        this.devs = [
            {
                name: 'Антон',
                link: 'https://github.com/antonsergeev',
                role: 'Team Lead',
                imgPath: 'Anton',
                work: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consectetur reiciendis possimus, sequi suscipit explicabo inventore enim in natus animiquibusdam quidem aliquid facilis, nihil odio, atque non voluptates temporibus!',
            },
            {
                name: 'Олег',
                link: 'https://github.com/ali-gator',
                role: 'Developer',
                imgPath: 'Oleg',
                work: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consectetur reiciendis possimus, sequi suscipit explicabo inventore enim in natus animiquibusdam quidem aliquid facilis, nihil odio, atque non voluptates temporibus!',
            },
            {
                name: 'Мария',
                link: 'https://github.com/OrangeJazz',
                role: 'Developer',
                imgPath: 'Orange',
                work: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consectetur reiciendis possimus, sequi suscipit explicabo inventore enim in natus animiquibusdam quidem aliquid facilis, nihil odio, atque non voluptates temporibus!',
            },
        ];
    }
}
