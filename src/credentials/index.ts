import {
  CB_ACCESS_KEY_HEADER,
  CB_ACCESS_PHRASE_HEADER,
  CB_ACCESS_SIGNATURE_HEADER,
  CB_ACCESS_TIMESTAMP_HEADER,
} from '../constants';
import * as crypto from 'crypto';

export class CoinbasePrimeCredentials {
  accessKey: string | undefined;
  secretKey: string | undefined;
  passphrase: string | undefined;

  constructor(key?: string, secret?: string, passphrase?: string) {
    if (!key || !secret || !passphrase) {
      console.log('Could not authenticate. Only public endpoints accessible.');
    }
    this.accessKey = key;
    this.secretKey = secret;
    this.passphrase = passphrase;
  }

  generateAuthHeaders(
    requestMethod: string,
    uri: string,
    body: string
  ): Record<string, string> {
    if (!this.secretKey || !this.accessKey || !this.passphrase) {
      return {};
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const message =
      timestamp + requestMethod + new URL(uri).pathname + (body || '');

    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(message)
      .digest('base64');

    return {
      [CB_ACCESS_TIMESTAMP_HEADER]: timestamp.toString(),
      [CB_ACCESS_SIGNATURE_HEADER]: signature,
      [CB_ACCESS_KEY_HEADER]: this.accessKey,
      [CB_ACCESS_PHRASE_HEADER]: this.passphrase,
    };
  }
}
