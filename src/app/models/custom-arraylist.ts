import { CourseData } from './course-data';

export class ArrayList{

    private itemsArray: CourseData[];

    constructor(){
        this.itemsArray = [];
    }

    getSize(){
        return this.itemsArray.length;
    }
    add(value: CourseData){
        this.itemsArray.push(value);
    }
    removeAt(i: number){
        let temp = [];

        for (let index = 0; index < this.itemsArray.length; index++) {
            if(index != i){
                temp.push(this.itemsArray[index]);
            }
        }
        this.itemsArray = temp;
        return this.itemsArray;
    }

    clear(){
        this.itemsArray = [];
    }

    getItemAt(i: number): CourseData{
        return this.itemsArray[i];
    }

    getAll(){
        return this.itemsArray;
    }
}