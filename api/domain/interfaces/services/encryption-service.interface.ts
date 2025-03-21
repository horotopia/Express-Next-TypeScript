export interface EncryptionServiceInterface {
    /**
     * Encrypts the given password
     * @param password The password to encrypt
     * @returns The encrypted password
     */
    hashPassword(password: string): Promise<string>;
    /**
     * Decrypts the given password
     * @param password The password to decrypt
     * @param hash The hash to compare the password
     * @returns The decrypted password
     */
    comparePassword(password: string, hash: string): Promise<boolean>;
}