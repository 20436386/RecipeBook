export class Recipe{
    public name: string;
    public description: string;
    public imgpath: string;

    constructor(name: string, desc:string, imgpath:string){
        this.name = name;
        this.description = desc;
        this.imgpath = imgpath;
    }
}