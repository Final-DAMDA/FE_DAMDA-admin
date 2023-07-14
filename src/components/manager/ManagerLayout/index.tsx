import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

import ManagerTable from '../ManagerTable';
import ActiveManager from '../ManagerTable/ActiveManager';
import { PaginationContainer } from '@/components/common/PaginationContainer/style';

import * as S from './style';
import { ManagerType } from '@/types/manager';
import useManagerPageStore from '@/store/manager';

interface ManagerLayoutProps {
  [key: string]: ManagerType[];
}

function ManagerLayout({
  activeManagers,
  waitingManagers,
  pendingManagers,
  inactiveManagers,
  activeRefetch,
  waitingRefetch,
  pendingRefetch,
  inactiveRefetch,
}: any) {
  const [category, setCategory] = useState('all');

  const { activePage, setActivePage } = useManagerPageStore((state) => state);

  const { total: activeTotal } = activeManagers || {};
  const { total: waitingTotal } = waitingManagers || {};
  const { total: pendingTotal } = pendingManagers || {};
  const { total: inactiveTotal } = inactiveManagers || {};

  const activePageHandler = (pageNumber: number) => {
    setActivePage(pageNumber);
    activeRefetch();
  };

  return (
    <div>
      <S.Header>
        <h1>매니저 관리</h1>
      </S.Header>

      {/* 활동 중 매니저 데이터 */}
      <ActiveManager />
      <PaginationContainer>
        <Pagination
          hideFirstLastPages={true}
          linkClassPrev="prev"
          linkClassNext="next"
          activePage={activePage}
          itemsCountPerPage={7}
          totalItemsCount={activeTotal}
          pageRangeDisplayed={Math.ceil(activeTotal / 7)}
          onChange={activePageHandler}
        />
      </PaginationContainer>

      <S.ButtonGroup category={category}>
        <button
          style={{
            backgroundColor: category === 'all' ? '#0061FF' : '#efefef',
            color: category === 'all' ? '#ffffff' : '#212121',
          }}
          type="button"
          onClick={() => setCategory('all')}
        >
          전체
        </button>
        <button
          style={{
            backgroundColor: category === 'waiting' ? '#0061FF' : '#efefef',
            color: category === 'waiting' ? '#ffffff' : '#212121',
          }}
          type="button"
          onClick={() => setCategory('waiting')}
        >
          매니저 신청 관리
        </button>
        <button
          style={{
            backgroundColor: category === 'pending' ? '#0061FF' : '#efefef',
            color: category === 'pending' ? '#ffffff' : '#212121',
          }}
          type="button"
          onClick={() => setCategory('pending')}
        >
          보류 매니저
        </button>
        <button
          style={{
            backgroundColor: category === 'inactive' ? '#0061FF' : '#efefef',
            color: category === 'inactive' ? '#ffffff' : '#212121',
          }}
          type="button"
          onClick={() => setCategory('inactive')}
        >
          활동 불가 매니저
        </button>
      </S.ButtonGroup>

      {/* 필터링 버튼에 따라 다른 데이터 전달 */}
      <ManagerTable
        waiting={waitingManagers?.content}
        pending={pendingManagers?.content}
        inactive={inactiveManagers?.content}
        category={category}
        waitingTotal={waitingTotal}
        waitingRefetch={waitingRefetch}
        pendingRefetch={pendingRefetch}
        pendingTotal={pendingTotal}
        inactiveRefetch={inactiveRefetch}
        inactiveTotal={inactiveTotal}
      />
    </div>
  );
}

export default ManagerLayout;
