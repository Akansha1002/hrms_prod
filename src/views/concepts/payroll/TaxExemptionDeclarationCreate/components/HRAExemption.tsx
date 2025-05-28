import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import { FormItem } from "@/components/ui/Form"; // adjust path if needed
import { DetailsSchema } from "../TaxExemptionDeclarationCreate";



type HRAExemptionProps = {
  control: Control<DetailsSchema>
  errors: Record<string, any>

}

const HRAExemption = ({ control, errors }: HRAExemptionProps) => {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-4">HRA Exemption</h3>

      {/* Monthly House Rent */}
      <FormItem
        label="Monthly House Rent"
        invalid={errors && errors.monthly_house_rent ? Boolean(errors.monthly_house_rent) : false}
        errorMessage={errors && errors.monthly_house_rent ? errors.monthly_house_rent.message : ''}
      >
        <Controller
          name="monthly_house_rent"
          control={control}
          render={({ field }) => (
            <Input
              className="w-[200px]"
              placeholder="Enter rent amount"
              value={Number(field.value) ?? ''}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </FormItem>


      <FormItem
        label="Rented in Metro City"
        invalid={errors && Boolean(errors.rented_in_metro_city)}
        errorMessage={errors && errors.rented_in_metro_city?.message}
      >
        <Controller
          name="rented_in_metro_city"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={!!field.value}
                onChange={field.onChange}
              />
              <label className="text-sm">Check if rented in a metro city</label>
            </div>
          )}
        />
      </FormItem>
    </div>
  );
};

export default HRAExemption;
