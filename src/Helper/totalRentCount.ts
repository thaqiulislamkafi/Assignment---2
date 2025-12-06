

export const totalRentCount = (start: string, end: string, daily_rent_price: number): number => {

    const begin = new Date(start);
    const last = new Date(end);

    const totalDays = Math.ceil(((last.getTime() - begin.getTime()) / (1000 * 60 * 60 * 24))) ; 

    const totalPrice  = totalDays * Number(daily_rent_price) ;
    return totalPrice ;
}