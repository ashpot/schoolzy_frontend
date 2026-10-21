import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormSelect from "@/shared/ui/FormSelect";
import FormInput from "@/shared/ui/FormInput";
import type { SchoolDetailsFormData } from "../schema/signupSchema";
import { useLocations } from "../hooks/useLocations";

const MANUAL = "__manual__"; // sentinel option; never stored as the city value

interface LocationFieldsProps {
  form: UseFormReturn<SchoolDetailsFormData>;
  isLoading: boolean;
}

export default function LocationFields({ form, isLoading }: LocationFieldsProps) {
  const { register, watch, setValue, getValues, formState: { errors } } = form;
  const state = watch("state");
  const [manualCity, setManualCity] = useState(false);
  const loc = useLocations(state);

  // List failed or came back empty for this state → fall back to typing the city
  const listUnavailable =
    !!state && !loc.citiesLoading && (!!loc.citiesError || loc.cities.length === 0);
  const showManual = manualCity || listUnavailable;

  // Options arrive after mount, so re-apply restored values (e.g. user pressed Back)
  useEffect(() => {
    if (loc.states.length) setValue("state", getValues("state"));
  }, [loc.states.length]);

  useEffect(() => {
    if (!state || loc.citiesLoading) return;
    const city = getValues("city");
    if (!city) return;
    if (loc.cities.some((o) => o.value === city)) setValue("city", city);
    else setManualCity(true); // restored city isn't in the list → it was typed manually
  }, [state, loc.citiesLoading, loc.cities.length]);

  const backToList = () => {
    setManualCity(false);
    setValue("city", "");
  };

  const cityOptions = loc.cities.length
    ? [...loc.cities, { value: MANUAL, label: "My city isn't listed. Enter manually" }]
    : [];

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-label tracking-wide">School Location</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <FormSelect
            label=""
            placeholder={loc.statesLoading ? "Loading states..." : "Select state"}
            options={loc.states}
            error={errors.state?.message ?? loc.statesError}
            isLoading={isLoading || loc.statesLoading}
            {...register("state", {
              onChange: () => {
                setValue("city", "");
                setManualCity(false);
              },
            })}
          />
        </div>
        <div className="flex-1">
          {showManual ? (
            <FormInput
              label=""
              placeholder="Enter your city"
              error={errors.city?.message}
              isLoading={isLoading}
              {...register("city")}
            />
          ) : (
            <FormSelect
              label=""
              placeholder={
                !state ? "Select a state first" : loc.citiesLoading ? "Loading cities..." : "Select city"
              }
              options={cityOptions}
              error={errors.city?.message}
              isLoading={isLoading || !state || loc.citiesLoading}
              {...register("city", {
                onChange: (e) => {
                  if (e.target.value === MANUAL) {
                    setManualCity(true);
                    setValue("city", "");
                  }
                },
              })}
            />
          )}
        </div>
      </div>

      {listUnavailable && !manualCity && (
        <p className="text-xs text-text-muted">
          {loc.citiesError
            ? "Couldn't load cities for this state. Please enter your city manually."
            : "City not available for this state. Please enter it manually."}
        </p>
      )}
      {manualCity && loc.cities.length > 0 && (
        <button type="button" onClick={backToList} className="text-xs text-brand-primary hover:underline">
          Choose from the list instead
        </button>
      )}
    </div>
  );
}