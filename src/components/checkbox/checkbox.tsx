import { Checkbox as MuiCheckbox, Box } from "@mui/material";

type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
};

export const Checkbox = (props: CheckboxProps) => {
  const { checked, indeterminate, onChange, ...restProps } = props;
  return (
    <MuiCheckbox
      size="small"
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      icon={
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: 1,
            border: 2,
            borderColor: "grey.300",
          }}
        />
      }
      indeterminateIcon={
        indeterminate && (
          <Box
            sx={{
              width: 22,
              height: 22,
              border: 2,
              borderRadius: 1,
              bgcolor: "var(--color-accent)",
              borderColor: "grey.300",
            }}
          />
        )
      }
      checkedIcon={
        <Box
          sx={{
            width: 22,
            height: 22,
            borderRadius: 1,
            backgroundColor: "var(--color-accent)",
            border: 2,
            borderColor: "grey.300",
          }}
        />
      }
      {...restProps}
    />
  );
};
