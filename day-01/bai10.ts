class Account {
    public accountNumber: string;
    private balance: number;
    readonly createAt: Date;
  
    constructor(accountNumber: string, balance: number) {
      this.accountNumber = accountNumber;
      this.balance = balance;
      this.createAt = new Date();
    }
      public getBalance(): number {
      return this.balance;
    }
      public deposit(amount: number): void {
      this.balance += amount;
    }
  }
    const account = new Account("ACC001", 1000);
  
  console.log(account.accountNumber);
  account.accountNumber = "ACC002";
    
  account.deposit(500);
  console.log(account.getBalance()); 

  console.log(account.createAt);
  