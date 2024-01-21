import * as React from 'react';
import { SelectorsResultProps } from '@grapesjs/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MAIN_BORDER_COLOR, cx } from './common';

const SelectorItem = ({ selector, removeSelector }) => (
  <div className='px-2 py-1 flex items-center gap-1 whitespace-nowrap bg-sky-500 rounded'>
    <div>{selector.getLabel()}</div>
    <button type='button' onClick={() => removeSelector(selector)}>
      <Icon size={0.7} path={mdiClose} />
    </button>
  </div>
);

const SelectorList = ({ selectors, removeSelector }) => (
  <div>
    {selectors.map((selector) => (
      <SelectorItem key={selector.toString()} selector={selector} removeSelector={removeSelector} />
    ))}
  </div>
);

const CustomSelectorManager = ({ selectors: originalSelectors, selectedState, states, targets, setState, addSelector, removeSelector }) => {
  const addNewSelector = () => {
    const nextIndex = originalSelectors.length + 1;
    addSelector({ name: `new-${nextIndex}`, label: `New ${nextIndex}` });
  };

  const renderAddSelectorButton = () => {
    const targetString = targets.join(', ');
    if (targetString) {
      return (
        <button type='button' onClick={addNewSelector} className={cx('border rounded px-2 py-1')}>
          <Icon size={0.7} path={mdiPlus} />
        </button>
      );
    } else {
      return <div className='opacity-70'>Select a component</div>;
    }
  };

  const renderSelectors = () => (
    <div className={cx('flex items-center gap-2 flex-wrap p-2 bg-black/30 border rounded min-h-[45px]', MAIN_BORDER_COLOR)}>
      {renderAddSelectorButton()}
      <SelectorList selectors={originalSelectors} removeSelector={removeSelector} />
    </div>
  );

  const renderStateOptions = () =>
    states.map((state) => (
      <MenuItem value={state.id} key={state.id}>
        {state.getName()}
      </MenuItem>
    ));

  return (
    <div className='gjs-custom-selector-manager p-2 flex flex-col gap-2 text-left'>
      {renderSelectors()}
      <div className='flex items-center'>
        <div className='flex-grow'>Selectors</div>
        <FormControl size='small'>
          <Select value={selectedState} onChange={(ev) => setState(ev.target.value)} displayEmpty>
            <MenuItem value=''>- State -</MenuItem>
            {renderStateOptions()}
          </Select>
        </FormControl>
      </div>
      <div>
        Selected: <span className='opacity-70'>{targets.join(', ') || 'None'}</span>
      </div>
    </div>
  );
};

export default CustomSelectorManager;
