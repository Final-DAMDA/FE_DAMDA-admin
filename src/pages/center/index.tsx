import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFAQData, getCenterData } from '@/api/center';

import CenterLayout from '@/components/center/CenterLayout';

import * as S from '@/styles/pages/center.style';
import { AxiosError } from 'axios';

function CenterPage() {
  // const queryClient = useQueryClient();

  // const { data: faqResponse } = useQuery({
  //   queryKey: ['faq'],
  //   queryFn: getCenterData,
  // });

  // const { mutate } = useMutation<boolean, AxiosError, number>(deleteFAQData, {
  //   onSuccess() {
  //     queryClient.invalidateQueries(['faq']);
  //   },
  // });

  // if (!faqResponse || faqResponse.length < 1) return <>Not Found Center Data</>;

  // return <CenterLayout faqResponse={faqResponse.data} mutate={mutate} />;
  return <CenterLayout />;
}

export default CenterPage;
