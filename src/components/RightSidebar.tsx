import React, { useState } from 'react';
import { BlocksProvider, LayersProvider, PagesProvider, SelectorsProvider, StylesProvider, TraitsProvider } from '@grapesjs/react';
import { mdiBrush, mdiLayers, mdiViewGridPlus, mdiTextBoxMultiple, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CustomBlockManager from './CustomBlockManager';
import CustomPageManager from './CustomPageManager';
import CustomLayerManager from './CustomLayerManager';
import CustomSelectorManager from './CustomSelectorManager';
import CustomStyleManager from './CustomStyleManager';
import CustomTraitManager from './CustomTraitManager';
import { MAIN_BORDER_COLOR, cx } from './common';

const defaultTabProps = {
  className: '!min-w-0',
};

const tabIcons = [mdiBrush, mdiCog, mdiLayers, mdiViewGridPlus, mdiTextBoxMultiple];

const RightSidebar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, value) => {
    setSelectedTab(value);
  };

  const renderSelectedTabContent = () => {
    switch (selectedTab) {
      case 0:
        return renderSelectorsAndStyles();
      case 1:
        return renderTraits();
      case 2:
        return renderLayers();
      case 3:
        return renderBlocks();
      case 4:
        return renderPages();
      default:
        return null;
    }
  };

  const renderSelectorsAndStyles = () => (
    <>
      <SelectorsProvider>{(props) => <CustomSelectorManager {...props} />}</SelectorsProvider>
      <StylesProvider>{(props) => <CustomStyleManager {...props} />}</StylesProvider>
    </>
  );

  const renderTraits = () => <TraitsProvider>{(props) => <CustomTraitManager {...props} />}</TraitsProvider>;

  const renderLayers = () => <LayersProvider>{(props) => <CustomLayerManager {...props} />}</LayersProvider>;

  const renderBlocks = () => <BlocksProvider>{(props) => <CustomBlockManager {...props} />}</BlocksProvider>;

  const renderPages = () => <PagesProvider>{(props) => <CustomPageManager {...props} />}</PagesProvider>;

  return (
    <div className={cx('gjs-right-sidebar flex flex-col', className)}>
      <Tabs value={selectedTab} onChange={handleTabChange} variant='fullWidth'>
        {tabIcons.map((icon, index) => (
          <Tab key={index} {...defaultTabProps} label={<Icon size={1} path={icon} />} />
        ))}
      </Tabs>
      <div className={cx('overflow-y-auto flex-grow border-t', MAIN_BORDER_COLOR)}>{renderSelectedTabContent()}</div>
    </div>
  );
};

export default RightSidebar;
