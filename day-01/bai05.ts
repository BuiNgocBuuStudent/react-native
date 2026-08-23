class BankAccount {
    balance: number;

    constructor(balance: number = 0) {
        this.balance = balance;
    }

    // Nạp tiền: chỉ cho phép số tiền > 0
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Nạp tiền thành công: ${amount}`);
        } else {
            console.log("Số tiền nạp phải lớn hơn 0");
        }
    }

    // Rút tiền: số tiền > 0 và số dư phải lớn hơn số tiền rút
    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Số tiền rút phải lớn hơn 0");
        } else if (this.balance <= amount) {
            console.log("Số dư không đủ để thực hiện giao dịch");
        } else {
            this.balance -= amount;
            console.log(`Rút tiền thành công: ${amount}`);
        }
    }
}

// Ví dụ
const bankAccount = new BankAccount(1000);

bankAccount.deposit(500);    // Thành công
bankAccount.deposit(-100);   // Không hợp lệ

bankAccount.withdraw(300);   // Thành công
bankAccount.withdraw(-50);   // Không hợp lệ
bankAccount.withdraw(2000);  // Không đủ số dư

console.log("Số dư hiện tại:", bankAccount.balance);
