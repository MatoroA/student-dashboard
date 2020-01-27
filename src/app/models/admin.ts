export class Admin{
    private name: string;
    private surname: string;
    private email: string;
    private cellPhone: number;
    private password: string;

    constructor(){}

    setName(name: string){
        this.name = name;
    }
    getName(): string{
        return this.name;
    }
    setSurname(surname: string){
        this.surname = surname;
    }
    getSurname(): string{
        return this.surname;
    }
    setEmail(email: string){
        this.email = email;
    }
    getEmail(): string{
        return this.email;
    }
    setCellphone(number: number){
        this.cellPhone = number;
    }
    getCellPhone(): number{
        return this.cellPhone;
    }
    setPassword(password: string){
        this.password = password;
    }
    getPassword(): string{
        return this.password;
    }
}