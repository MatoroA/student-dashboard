import { Observable } from 'rxjs';
import { Content } from './content-interface';

export class CourseData{
    private file: any;
    private url: string;
    private title: string;
    private audience: string;
    private format: string;
    private fileName: string;
    private uploadProgress$: Observable<number>;
    
    public setFileName(fileName: string){
        this.fileName = fileName;
    }

    public setFileUrl(url: string){
        this.url = url;
    }

    getFileUrl(){
        return this.url;
    }

    getFileName(){
        return this.fileName;
    }

    public setFormat(format){
        this.format = format;
    }

    getFormat(){
        return this.format;
    }

    public getFile(){
        return this.file;
    }
    public setFile(file: any){
        this.file = file;
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
    public setProgress(progress$: Observable<number>){
        this.uploadProgress$ = progress$;
    }

    getProgress$(){
        return this.uploadProgress$;
    }
}