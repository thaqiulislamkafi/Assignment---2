

export const formattingUserView = (UserData:any)=>{

    const formattedData = UserData.map((data:any) => ({
        id: data.id,
        vehicle_id: data.vehicle_id,
        rent_start_date: data.rent_start_date,
        rent_end_date: data.rent_end_date,
        total_price: data.total_price,
        status: data.status,
        vehicle: {
          vehicle_name: data.vehicle_name,
          registration_number: data.registration_number,
          type : data.type
        },
      }));
      
      return formattedData ;

}