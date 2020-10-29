class User{
    public readonly user_nicename:string;
    public readonly user_pass:string;

    constructor(username: string, password:string){
        this.user_nicename = username;
        this.user_pass = password;
    }
}

export default User;