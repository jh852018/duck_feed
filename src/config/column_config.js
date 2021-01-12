export const adminColumns = [
    // { field: 'id', headerName: 'Feed Time(UTC)', width: 70 },
    { field: 'time',
      headerName: 'Feed Time(Local)',
      width: 200,
      valueGetter: (params)=>{
          return `${(new Date(params.getValue('df_time'))).toLocaleString()}`
      }
    },
    { field: 'df_food', headerName: 'Food Name', width: 130 },
    { field: 'df_location', headerName: 'Feed Location', width: 150 },
    { field: 'df_count', headerName: 'Duck Count', type: 'number', width: 150 },
    { field: 'df_food_type', headerName: 'Duck Food Type', width: 170 },
    { field: 'df_food_qty',headerName: 'Duck Food Qty.', type: 'number', width: 170 },    
  ];