class BankAccount {
  private _balance: number;

  constructor(balance: number) {
    this._balance = balance;
  }

  getBalance(): number {
    return this._balance;
  }

  /* Сеттер setBalance: Устанавливает новое значение баланса, если оно больше или равно нулю.
     В противном случае, устанавливает баланс в ноль. */

  setBalance(value: number): void {
    if (value >= 0) {
      this._balance = value;
    } else {
      this._balance = 0;
    }
  }

  /* deposit(amount: number): Метод для внесения средств на счет. 
    Увеличивает значение balance на amount, если amount больше нуля. */

  deposit(amount: number): void {
    if (amount > 0) {
      this._balance += amount;
    }
  }

  /* withdraw(amount: number): Метод для снятия средств со счета. 
    Уменьшает значение balance на amount, если amount больше нуля и меньше или равно balance. */
  withdraw(amount: number): void {
    if (amount > 0 && amount <= this._balance) {
      this._balance -= amount;
    }
  }
  /* transfer(amount: number, account: BankAccount): Метод для перевода средств на другой счет.
    Уменьшает значение balance на amount, если amount больше нуля и меньше или равно balance.
    Затем увеличивает значение balance объекта account на amount. */

  transfer(amount: number, account: BankAccount): void {
    if (amount > 0 && amount <= this._balance) {
      this._balance -= amount;
      account.deposit(amount);
    }
  }
}

/* Проверь свой код:
Убедись, что баланс не может быть установлен напрямую.

Проверь, что внесение и снятие средств работают корректно и баланс обновляется правильно.

Проверь, что сеттер корректно обрабатывает случаи с отрицательным балансом. */

const account = new BankAccount(1000);
console.log(account.getBalance()); // 1000

account.setBalance(500);
console.log(account.getBalance()); // 500

account.setBalance(-100);
console.log(account.getBalance()); // 0

account.deposit(500);
console.log(account.getBalance()); // 500

account.withdraw(200);
console.log(account.getBalance()); // 300

account.withdraw(400);
console.log(account.getBalance()); // 300

const account2 = new BankAccount(0);
account.transfer(100, account2);
console.log(account.getBalance()); // 200
console.log(account2.getBalance()); // 100


export { BankAccount };
