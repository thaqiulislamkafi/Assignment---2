import bcrypt from 'bcrypt' ;

export const comparePassword = async(password:string,hashedPassword:string):Promise<boolean>=>{

    const comparing = bcrypt.compare(password,hashedPassword) ;
    return comparing ;
    
}