import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import { mdiArrowDownDropCircle, mdiArrowUpDropCircle, mdiClose, mdiDelete, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import type { Property, PropertyStack } from 'grapesjs';
import { BTN_CLS, ROUND_BORDER_COLOR, cx } from './common';

// Helper function to render text field
const renderTextField = (prop, onChange, defValue, valueString, valueWithDef) => (
  <TextField placeholder={defValue} value={valueString} onChange={onChange} size='small' fullWidth />
);

// Helper function to render radio group
const renderRadioGroup = (prop, onChange) => (
  <RadioGroup value={prop.getValue()} onChange={onChange} row>
    {prop.getOptions().map((option) => (
      <FormControlLabel
        key={prop.getOptionId(option)}
        value={prop.getOptionId(option)}
        label={prop.getOptionLabel(option)}
        control={<Radio size='small' />}
      />
    ))}
  </RadioGroup>
);

// Helper function to render select field
const renderSelectField = (prop, onChange) => (
  <FormControl fullWidth size='small'>
    <Select value={prop.getValue()} onChange={onChange}>
      {prop.getOptions().map((option) => (
        <MenuItem key={prop.getOptionId(option)} value={prop.getOptionId(option)}>
          {prop.getOptionLabel(option)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Helper function to render color field
const renderColorField = (prop, onChange, defValue, valueString, valueWithDef) => (
  <TextField
    fullWidth
    placeholder={defValue}
    value={valueString}
    onChange={onChange}
    size='small'
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          <div className={`w-[15px] h-[15px] ${ROUND_BORDER_COLOR}`} style={{ backgroundColor: valueWithDef }}>
            <input
              type='color'
              className='w-[15px] h-[15px] cursor-pointer opacity-0'
              value={valueWithDef}
              onChange={(ev) => prop.upValue(ev.target.value)}
            />
          </div>
        </InputAdornment>
      ),
    }}
  />
);

// Helper function to render slider field
const renderSliderField = (prop, onChange) => (
  <Slider
    size='small'
    value={parseFloat(prop.getValue())}
    min={prop.getMin()}
    max={prop.getMax()}
    step={prop.getStep()}
    onChange={onChange}
    valueLabelDisplay='auto'
  />
);

// Helper function to render file field
const renderFileField = (prop, openAssets) => (
  <div className='flex flex-col items-center gap-3'>
    {prop.getValue() && prop.getValue() !== prop.getDefaultValue() && (
      <div
        className='w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer'
        style={{ backgroundImage: `url("${prop.getValue()}")` }}
        onClick={() => prop.upValue('')}
      />
    )}
    <button type='button' onClick={openAssets} className={BTN_CLS}>
      Select Image
    </button>
  </div>
);

// Helper function to render composite field
const renderCompositeField = (prop) => (
  <div className={cx('flex flex-wrap p-2 bg-black/20', ROUND_BORDER_COLOR)}>
    {prop.getProperties().map((subProp) => (
      <StylePropertyField key={subProp.getId()} prop={subProp} />
    ))}
  </div>
);

// Helper function to render stack field
const renderStackField = (prop, layers) => (
  <div className={cx('flex flex-col p-2 gap-2 bg-black/20 min-h-[54px]', ROUND_BORDER_COLOR)}>
    {layers.map((layer) => (
      <div key={layer.getId()} className={ROUND_BORDER_COLOR}>
        <div className='flex gap-1 bg-slate-800 px-2 py-1 items-center'>
          <IconButton size='small' onClick={() => layer.move(layer.getIndex() - 1)}>
            <Icon size={0.7} path={mdiArrowUpDropCircle} />
          </IconButton>
          <IconButton size='small' onClick={() => layer.move(layer.getIndex() + 1)}>
            <Icon size={0.7} path={mdiArrowDownDropCircle} />
          </IconButton>
          <button className='flex-grow' onClick={() => layer.select()}>
            {layer.getLabel()}
          </button>
          <div
            className={cx('bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center', ROUND_BORDER_COLOR)}
            style={layer.getStylePreview({ number: { min: -3, max: 3 }, camelCase: true })}
          >
            {prop.getName() === 'text-shadow' && 'T'}
          </div>
          <IconButton size='small' onClick={() => layer.remove()}>
            <Icon size={0.7} path={mdiDelete} />
          </IconButton>
        </div>
        {layer.isSelected() && (
          <div className='p-2 flex flex-wrap'>
            {prop.getProperties().map((subProp) => (
              <StylePropertyField key={subProp.getId()} prop={subProp} />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

// Main component
const StylePropertyField = ({ prop, ...rest }) => {
  const editor = useEditor();

  // Handler for value change
  const handleChange = (value) => {
    prop.upValue(value);
  };

  // Handler for input change
  const onChange = (ev) => {
    handleChange(ev.target.value);
  };

  // Helper function to open assets
  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete });
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ['image'],
      accept: 'image/*',
    });
  };

  // Property details
  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : '';
  const valueWithDef = hasValue ? value : defValue;

  // Determine input to render based on property type
  let inputToRender = renderTextField(prop, onChange, defValue, valueString, valueWithDef);

  switch (type) {
    case 'radio':
      inputToRender = renderRadioGroup(prop, onChange);
      break;
    case 'select':
      inputToRender = renderSelectField(prop, onChange);
      break;
    case 'color':
      inputToRender = renderColorField(prop, onChange, defValue, valueString, valueWithDef);
      break;
    case 'slider':
      inputToRender = renderSliderField(prop, onChange);
      break;
    case 'file':
      inputToRender = renderFileField(prop, openAssets);
      break;
    case 'composite':
      inputToRender = renderCompositeField(prop);
      break;
    case 'stack':
      inputToRender = renderStackField(prop, (prop as PropertyStack).getLayers());
      break;
  }

  return (
    <div {...rest} className={cx('mb-3 px-1', prop.isFull() ? 'w-full' : 'w-1/2')}>
      <div className={cx('flex mb-2 items-center', canClear && 'text-sky-300')}>
        <div className='flex-grow capitalize'>{prop.getLabel()}</div>
        {canClear && (
          <button onClick={() => prop.clear()}>
            <Icon path={mdiClose} size={0.7} />
          </button>
        )}
        {type === 'stack' && (
          <IconButton size='small' className='!ml-2' onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}>
            <Icon size={1} path={mdiPlus} />
          </IconButton>
        )}
      </div>
      {inputToRender}
    </div>
  );
};

export default StylePropertyField;
