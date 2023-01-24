import React from 'react';
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

function FormInput({name, label, required}) {
    const { control } = useFormContext();
    return (
        <Grid sx={{maxWidth: "100%"}} item xs={12} sm={6}>
          <Controller
            defaultValue=""
            control={control}
            name={name}
            render={({ field }) => (
              <TextField
                {...field}
                name={name}
                label={label}
                required={required}
                fullWidth
              />
            )}
          />
        </Grid>
      );
    };

export default FormInput