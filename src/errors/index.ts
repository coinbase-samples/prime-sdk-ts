import {
  CoinbaseClientException,
  CoinbaseError,
  CoinbaseResponse,
} from '../../../core-ts/dist';

export class CoinbasePrimeClientException extends CoinbaseClientException {
  constructor(message: string) {
    super(message);
  }
}

export class CoinbasePrimeException extends CoinbaseError {
  constructor(message: string, statusCode: number, response: CoinbaseResponse) {
    super(message, statusCode, response);
  }
}
