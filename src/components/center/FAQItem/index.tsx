import React, { useState } from 'react';
import { StateButton } from '@/styles/common/StateButton';
import Modal from '../Modal';
import * as G from '@/styles/common/table.style';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

interface FAQItemProps {
  index: number;
  id: number;
  title: string;
  type: string;
  contents?: string;
  deleteFAQHandler: (id: number) => void;
}

function FAQItem({ id, index, title, type, contents, deleteFAQHandler }: FAQItemProps) {
  const [isFaqClicked, setIsFaqClicked] = useState(false);
  const router = useRouter();

  // const deleteFAQHandler = (id: number) => {
  //   mutate(id);
  // };

  // let transformedCategory;
  // switch (qnaCategory) {
  //   case 'PRICE':
  //     transformedCategory = '가격';
  //     break;

  //   case 'SERVICE':
  //     transformedCategory = '서비스 관련';
  //     break;

  //   case 'ETC':
  //     transformedCategory = '기타';
  //     break;

  //   default:
  //     break;
  // }

  return (
    <>
      <G.Tr onDoubleClick={() => setIsFaqClicked(true)}>
        <G.Td>{index + 1}</G.Td>
        <G.Td>{title}</G.Td>
        <G.Td>{type}</G.Td>
        <G.Td>
          <StateButton state="red" onClick={() => deleteFAQHandler(id)}>
            삭제
          </StateButton>
        </G.Td>
      </G.Tr>
      {isFaqClicked && (
        <Modal faq="faq" id={id} title={title} type={type} contents={contents} setIsFaqClicked={setIsFaqClicked} />
      )}
    </>
  );
}

export default FAQItem;
