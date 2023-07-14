import React, { useState } from 'react';
import Image from 'next/image';
import { customerCenterDummyData } from '@/constants/customerCenterDummyData';
import { CenterData, CenterDataDummy, FAQResponse } from '@/types/api/center';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import FAQItem from '../FAQItem';

import * as G from '@/styles/common/table.style';
import * as S from './style';

// interface CenterLayoutProps {
//   faqResponse: CenterData[];
//   mutate: UseMutateFunction<boolean, AxiosError, number>;
// }

function CenterLayout() {
  const [data, setData] = useState(customerCenterDummyData);

  const deleteFAQHandler = (id: number) => {
    const newData = data.filter((dummyData) => dummyData.id !== id);
    setData(newData);
  };

  return (
    <div>
      <S.Title>고객 센터</S.Title>

      <S.AddButton href="/center/newFaq">
        <Image src="/icons/faq-add-button.svg" alt="faq-add-button" width={24} height={24} />
      </S.AddButton>

      <G.TableContainer>
        <G.Table>
          <thead>
            <G.Tr>
              <G.Th scope="col">순번</G.Th>
              <G.Th scope="col">제목</G.Th>
              <G.Th scope="col">유형</G.Th>
              <G.Th scope="col">action</G.Th>
            </G.Tr>
          </thead>

          <G.Tbody>
            {/* {faqResponse?.map((item: FAQResponse, index: number) => (
              <FAQItem
                key={item.qnaId}
                index={index}
                qnaId={item.qnaId}
                title={item.title}
                qnaCategory={item.qnaCategory}
                mutate={mutate}
              />
            ))} */}
            {data.map((data: CenterDataDummy, index: number) => {
              return (
                <FAQItem
                  key={data.id}
                  id={data.id}
                  contents={data.contents}
                  index={index}
                  title={data.title}
                  type={data.type}
                  deleteFAQHandler={deleteFAQHandler}
                />
              );
            })}
          </G.Tbody>
        </G.Table>
      </G.TableContainer>
    </div>
  );
}

export default CenterLayout;
