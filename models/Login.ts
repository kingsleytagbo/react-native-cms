class Login{
    public readonly buttonText:string; 
    public readonly children:any; 
    public readonly onSubmit:Function; 
    public readonly onSuccess:Function;
    public readonly onFailure:Function;

    constructor(buttonText:string, children:any, onSubmit:Function, onSuccess:Function, onFailure:Function){
        this.buttonText = buttonText;
        this.onSubmit = onSubmit;
        this.children = children;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
    }
}

export default Login;