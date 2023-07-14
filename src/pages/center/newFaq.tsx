import React from 'react';
import { postFAQData } from '@/api/center';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FAQData } from '@/types/api/center';

import NewFaqLayout from '@/components/center/NewFaqLayout';

function NewFaqPage() {
  // const queryClient = useQueryClient();

  // const { mutate } = useMutation<boolean, AxiosError, FAQData>(postFAQData, {
  //   onSuccess() {
  //     queryClient.invalidateQueries(['faq']);
  //   },
  // });

  // return <NewFaqLayout mutate={mutate} />;
  return <NewFaqLayout />;
}

export default NewFaqPage;
