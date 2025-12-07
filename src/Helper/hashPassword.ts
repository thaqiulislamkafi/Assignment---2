import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {

    const salt = 10;
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
}