import { wordList } from "./words";

// Base class for character-based passwords
class PasswordGenerator {
  readonly passwordLength: number;

  constructor(length: number = 12) {
    this.passwordLength = length;
  }

  // Generate random character-based password
  public generatePassword(): string {
    let password = "";

    while (password.length < this.passwordLength) {
      password += this.generateRandomCharacter();
    }

    return password.slice(0, this.passwordLength);
  }

  // Random character: letters, numbers, symbols
  private generateRandomCharacter(): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()".split("");
    return this.getRandomItem(characters);
  }

  // Pick a random item from any array
  protected getRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

// Derived class: word-based readable password
class ReadablePasswordGenerator extends PasswordGenerator {
  private generateRandomWord(): string {
    return this.getRandomItem(wordList);
  }

  public generatePassword(): string {
    const words: string[] = [];

    while (words.join("-").length < this.passwordLength) {
      words.push(this.generateRandomWord());
    }

    const password = words.join("-");

    return password.slice(0, this.passwordLength);
  }
}

// Derived class: mixed readable password (words + numbers/symbols)
class MixedReadablePasswordGenerator extends ReadablePasswordGenerator {
  private generateRandomSymbolOrNumber(): string {
    const symbols = "0123456789!@#$%^&*()".split("");
    return this.getRandomItem(symbols);
  }

  public generatePassword(): string {
    const parts: string[] = [];

    while (parts.join("-").length < this.passwordLength) {
      if (Math.random() < 0.7) {
        parts.push(this.getRandomItem(wordList));
      } else {
        parts.push(this.generateRandomSymbolOrNumber());
      }
    }

    const password = parts.join("-");

    return password.slice(0, this.passwordLength);
  }
}

const charPasswordGen = new PasswordGenerator(30);
console.log("Character-based password:", charPasswordGen.generatePassword());

const readablePasswordGen = new ReadablePasswordGenerator(30);
console.log("Word-based readable password:", readablePasswordGen.generatePassword());

const mixedPasswordGen = new MixedReadablePasswordGenerator(30);
console.log("Mixed readable password:", mixedPasswordGen.generatePassword());