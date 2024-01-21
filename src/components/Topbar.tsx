import * as React from 'react';
import { DevicesProvider, WithEditor } from '@grapesjs/react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { cx } from './common';
import TopbarButtons from './TopbarButtons';

function renderDeviceMenuItem(device) {
  return (
    <MenuItem value={device.id} key={device.id}>
      {device.getName()}
    </MenuItem>
  );
}

function DeviceSelect({ selectedDevice, onSelectDevice, availableDevices }) {
  return (
    <FormControl size='small'>
      <Select value={selectedDevice} onChange={(ev) => onSelectDevice(ev.target.value)}>
        {availableDevices.map(renderDeviceMenuItem)}
      </Select>
    </FormControl>
  );
}

function Topbar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('gjs-top-sidebar flex items-center p-1', className)}>
      <DevicesProvider>
        {({ selected, select, devices }) => <DeviceSelect selectedDevice={selected} onSelectDevice={select} availableDevices={devices} />}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons className='ml-auto px-2' />
      </WithEditor>
    </div>
  );
}

export default Topbar;
