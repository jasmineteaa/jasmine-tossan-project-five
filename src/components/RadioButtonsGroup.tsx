import * as React from 'react';
import { Radio, Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

// RadioButtonGroup can keep track of its own value state
// or can take a value state from parent component

interface IRadioOptions {
  value: string;
  label: string;
}

interface IRadioButtonsGroup {
  formControlLabelProps?: Object;
  radioOptions: IRadioOptions[];
  customValue?: string;
  customOnChange?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiFormLabel-root.Mui-focused': {
        color: theme.palette.common.white
      },
    },
    root: {
      flexDirection: 'row'
    },
    label: {
      fontSize: theme.typography.h5.fontSize,
    },
  }),
);


const RadioButtonsGroup: React.FC<IRadioButtonsGroup> = (props) => {
  const {
    formControlLabelProps = {},
    radioOptions,
    customOnChange,
    customValue,
  } = props;

  const classes = useStyles();
  // inital value in own state will be first radio option value by default
  const [value, setValue] = React.useState(radioOptions[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <Grid container={true} alignItems='center'>
        <Grid item={true}>
          <FormLabel
            component="legend"
            required={true}
            className={classes.label}
            classes={{
              root: classes.label,
            }}
          >
            Please select your country:
          </FormLabel>
        </Grid>
        <RadioGroup
          aria-label="user-country"
          name="user-country"
          value={customValue ? customValue : value}
          onChange={customOnChange ? customOnChange : handleChange}
          className={classes.root}
        >
          {
            radioOptions.map(({ value, label }) => (
              <FormControlLabel
                key={label}
                value={value}
                label={label}
                control={<Radio />}
                classes={{
                  label: classes.label,
                }}
                {...formControlLabelProps}
              />
            ))
          }
        </RadioGroup>
      </Grid>
    </FormControl>
  );
}

export default RadioButtonsGroup;