import React from 'react';
import { TraitsResultProps } from '@grapesjs/react';
import TraitPropertyField from './TraitPropertyField';

const CustomTraitManager = ({ traits }: Omit<TraitsResultProps, 'Container'>) => {
  const renderTraitFields = () => {
    if (!traits.length) {
      return renderNoPropertiesMessage();
    }

    return traits.map(renderTraitPropertyField);
  };

  const renderNoPropertiesMessage = () => <div>No properties available</div>;

  const renderTraitPropertyField = (trait) => <TraitPropertyField key={trait.getId()} trait={trait} />;

  return <div className='gjs-custom-style-manager text-left mt-3 p-1'>{renderTraitFields()}</div>;
};

export default CustomTraitManager;
