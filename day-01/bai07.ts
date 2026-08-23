class User {
    private _name: string;
  
    constructor(name: string) {
      this._name = name;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  }
  
  const user = new User("John");
  
  console.log(user.name); 
  
  user.name = "David";
  console.log(user.name);
  