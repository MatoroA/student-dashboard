export class CourseData{
    private imgUrl: any;
    private title: string;
    private audience: string;

    public getImgUrl(){
        return this.imgUrl;
    }
    public setImgUrl(imgUrl: any){
        this.imgUrl = imgUrl;
    }
    public setTitle(title: string){
        this.title = title;
    }
    public getTitle(){
        return this.title;
    }
    public setAudience(audience: string){
        this.audience = audience;
    }
    public getAudience(){
        return this.audience;
    }
}