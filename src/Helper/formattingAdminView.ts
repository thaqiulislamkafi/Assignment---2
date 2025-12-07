
export const formattingAdminView = (AdminData:any)=>{

    const formattedData = AdminData.map((data:any) => ({
        id: data.id,
        customer_id: data.customer_id,
        vehicle_id: data.vehicle_id,
        rent_start_date: data.rent_start_date,
        rent_end_date: data.rent_end_date,
        total_price: data.total_price,
        status: data.status,
        customer: {
          name: data.name,
          email: data.email,
        },
        vehicle: {
          vehicle_name: data.vehicle_name,
          registration_number: data.registration_number,
        },
      }));
      
      return formattedData;
}