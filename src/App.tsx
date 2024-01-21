import React from 'react';
import GjsEditor, { AssetsProvider, Canvas, ModalProvider } from '@grapesjs/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MAIN_BORDER_COLOR } from './components/common';
import CustomModal from './components/CustomModal';
import CustomAssetManager from './components/CustomAssetManager';
import Topbar from './components/Topbar';
import RightSidebar from './components/RightSidebar';
import './style.css';
import { plugin } from './plugin/plugin';
import { onEditor } from './onEditor/onEditor';
import { gjsOptions } from './gjsOptions/gjsOptions';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MainContent = () => (
  <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
    <div className='gjs-column-m flex flex-col flex-grow'>
      <Topbar className='min-h-[48px]' />
      <Canvas className='flex-grow gjs-custom-editor-canvas' />
    </div>
    <RightSidebar className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`} />
  </div>
);

const App = () => {
  const renderCustomModal = ({ open, title, content, close }) => (
    <CustomModal open={open} title={title} close={close}>
      {content}
    </CustomModal>
  );

  const renderCustomAssetManager = ({ assets, select, close, Container }) => (
    <Container>
      <CustomAssetManager assets={assets} select={select} close={close} />
    </Container>
  );

  return (
    <ThemeProvider theme={theme}>
      <GjsEditor
        className='gjs-custom-editor text-white bg-slate-900'
        grapesjs='https://unpkg.com/grapesjs'
        grapesjsCss='https://unpkg.com/grapesjs/dist/css/grapes.min.css'
        options={gjsOptions}
        plugins={plugin}
        onEditor={onEditor}
      >
        <MainContent />
        <ModalProvider>{(modalProps) => renderCustomModal(modalProps)}</ModalProvider>
        <AssetsProvider>{(assetProps) => renderCustomAssetManager(assetProps)}</AssetsProvider>
      </GjsEditor>
    </ThemeProvider>
  );
};

export default App;
