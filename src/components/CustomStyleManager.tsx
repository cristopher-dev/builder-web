import React from 'react';
import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MAIN_BG_COLOR } from './common';
import StylePropertyField from './StylePropertyField';

const accordionIcon = <Icon path={mdiMenuDown} size={0.7} />;

const renderAccordionSummary = (sector) => (
  <AccordionSummary className='!bg-slate-800' expandIcon={accordionIcon}>
    {sector.getName()}
  </AccordionSummary>
);

const renderAccordionDetails = (sector) => (
  <AccordionDetails className={`${MAIN_BG_COLOR} flex flex-wrap`}>
    {sector.getProperties().map((prop) => (
      <StylePropertyField key={prop.getId()} prop={prop} />
    ))}
  </AccordionDetails>
);

const renderSectorAccordion = (sector) => (
  <Accordion key={sector.getId()} disableGutters>
    {renderAccordionSummary(sector)}
    {renderAccordionDetails(sector)}
  </Accordion>
);

const CustomStyleManager = ({ sectors }) => (
  <div className='gjs-custom-style-manager text-left'>{sectors.map((sector) => renderSectorAccordion(sector))}</div>
);

export default CustomStyleManager;
