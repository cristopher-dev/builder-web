import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Importa SelectChangeEvent
import TextField from '@mui/material/TextField';
import type { Trait } from 'grapesjs';
import { ROUND_BORDER_COLOR, cx } from './common';

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({ trait, ...rest }: StylePropertyFieldProps) {
  const editor = useEditor();

  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChangeTextField = (ev: React.ChangeEvent<any>) => {
    handleChange(ev.target.value);
  };

  const onChangeSelect = (ev: SelectChangeEvent<string | number | unknown>) => {
    // Ajusta el tipo de evento
    const selectedValue = ev.target.value as string;
    handleChange(selectedValue);
  };

  const handleButtonClick = () => {
    const command = trait.get('command');
    if (command) {
      typeof command === 'string' ? editor.runCommand(command) : command(editor, trait);
    }
  };

  const renderTextField = () => (
    <TextField
      placeholder={trait.getDefault() || trait.attributes.placeholder}
      value={trait.getValue()}
      onChange={onChangeTextField}
      size='small'
      fullWidth
    />
  );

  const renderSelectField = () => (
    <FormControl fullWidth size='small'>
      <Select value={trait.getValue() || ''} onChange={onChangeSelect}>
        {trait.getOptions().map((option) => (
          <MenuItem key={trait.getOptionId(option)} value={trait.getOptionId(option) || ''}>
            {trait.getOptionLabel(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderColorField = () => (
    <TextField
      fullWidth
      placeholder={trait.getDefault()}
      value={trait.getValue()}
      onChange={onChangeTextField}
      size='small'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <div className={`w-[15px] h-[15px] ${ROUND_BORDER_COLOR}`} style={{ backgroundColor: trait.getValue() || trait.getDefault() }}>
              <input
                type='color'
                className='w-[15px] h-[15px] cursor-pointer opacity-0'
                value={trait.getValue()}
                onChange={(ev) => handleChange(ev.target.value)}
              />
            </div>
          </InputAdornment>
        ),
      }}
    />
  );

  const renderCheckbox = () => (
    <Checkbox checked={trait.getValue() as boolean} onChange={(ev) => trait.setValue(ev.target.checked)} size='small' />
  );

  const renderButton = () => (
    <Button fullWidth onClick={handleButtonClick}>
      {trait.getLabel()}
    </Button>
  );

  return (
    <div {...rest} className={cx('mb-3 px-1 w-full')}>
      <div className={cx('flex mb-2 items-center')}>
        <div className='flex-grow capitalize'>{trait.getLabel()}</div>
      </div>
      {trait.getType() === 'select' && renderSelectField()}
      {trait.getType() === 'color' && renderColorField()}
      {trait.getType() === 'checkbox' && renderCheckbox()}
      {trait.getType() === 'button' && renderButton()}
      {trait.getType() !== 'select' &&
        trait.getType() !== 'color' &&
        trait.getType() !== 'checkbox' &&
        trait.getType() !== 'button' &&
        renderTextField()}
    </div>
  );
}
