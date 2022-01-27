import {duration, TextField, TextFieldProps} from "@mui/material";
import * as React from 'react'
import {ComponentType, useEffect, useState} from "react";
import {DurationType, DurationView, Labels} from "./types";
import DefaultLabels from "./defaultLabelsEn.json";

export type DurationFieldProps = TextFieldProps & {
  duration: DurationType,
  onConfirm: (value: number | undefined) => void;
  view: DurationView;
  labels?: Labels;
  TextFieldComp?: ComponentType<TextFieldProps>;
}

export const DurationField = ({
  duration,
  onConfirm,
  TextFieldComp = TextField,
  view,
  labels: _labels,
  ...props
}: DurationFieldProps) => {
  const labels = {
    ...DefaultLabels,
    ..._labels
  }

  const [value, setValue] = useState<number | undefined>(duration[view] )

  const hasMinValue = props.inputProps?.min? parseInt(props.inputProps.min, 10) : null;


  useEffect(() => {
    setValue(duration[view] )
  }, [duration, setValue])

  return (
    <TextFieldComp
      type="number"
      onChange={({target}) => {
        const num = +target.value

        if (hasMinValue !== null && hasMinValue > num) {
          setValue(target.value === '' ? undefined : hasMinValue);
        } else
        {
          setValue(!isFinite(num) || target.value === '' ? undefined : num);
        }
      }}
      onBlur={() => {
        onConfirm(value)
      }}
      value={value ?? ''}
      fullWidth
      label={labels[view]}
      {...props}
    />
  )
}
