import React from 'react';
import { FormElementsProps } from '@/types/components/form';
import Title from '@/components/form/components/Title';
import AddressInput from '@/components/form/components/AddressInput';
import Select from '@/components/form/components/Select';
import Radio from '@/components/form/components/Radio';

function FormElements({ formData }: FormElementsProps) {
  if (formData.questionIdentify === 'ADDRESS') return <AddressInput formData={formData} />;

  switch (formData.questionType) {
    case 'TITLE':
      return <Title formData={formData} />;
    case 'STRING':
      return <Title formData={formData} />;
    case 'ADDRESS':
      return <AddressInput formData={formData} />;
    case 'SELECT':
      return <Select formData={formData} />;
    case 'RADIO':
      return <Radio formData={formData} />;
    case 'DATE':
  }
}

export default FormElements;