import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { inactiveDummyData, managerDummyData, pendingDummyData } from '@/constants/managerDummyData';

import ManagerItem from './ManagerItem';
import { PaginationContainer } from '@/components/common/PaginationContainer/style';

import * as G from '@/styles/common/table.style';
import * as M from '../ManagerTable/style';
import * as S from './style';
import useManagerPageStore from '@/store/manager';
import ActiveManagerItem from './ActiveManagerItem';
import { ManagerDummyDataType } from '@/types/managerDummyData';
import ActiveManager from './ActiveManager';

function ManagerTable({
  waiting,
  pending,
  inactive,
  category,
  waitingTotal,
  waitingRefetch,
  pendingRefetch,
  pendingTotal,
  inactiveRefetch,
  inactiveTotal,
}: any) {
  const { waitingPage, pendingPage, inactivePage, setWaitingPage, setPendingPage, setInactivePage } =
    useManagerPageStore((state) => state);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const prevActivePending = pending?.filter((item: any) => item.prevManagerStatus === 'ACTIVE');
  const prevWaitingPending = pending?.filter((item: any) => item.prevManagerStatus === 'WAITING');

  const prevActiveInActive = inactive?.filter((item: any) => item.prevManagerStatus === 'ACTIVE');
  const prevWaitingInActive = inactive?.filter((item: any) => item.prevManagerStatus === 'WAITING');

  let content;
  if (
    category === 'all' ||
    (waiting && category === 'waiting') ||
    (pending && category === 'pending') ||
    (inactive && category === 'inactive')
  ) {
    content = (
      <>
        <colgroup>
          <col width="5%" />
          <col width="15%" />
          <col width="30%" />
          <col width="10%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>

        <G.Thead>
          <tr>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              이름
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              연락처
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              활동지역
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              레벨
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              자격증
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              운전여부
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              지원 폼
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              예약 내역
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              상태
            </S.ManagerTh>
            <S.ManagerTh scope="col" style={{ textAlign: 'left' }}>
              메모
            </S.ManagerTh>
          </tr>
        </G.Thead>
      </>
    );
  }

  const waitingPageHandler = (pageNumber: number) => {
    setWaitingPage(pageNumber);
    waitingRefetch();
  };

  const pendingPageHandler = (pageNumber: number) => {
    setPendingPage(pageNumber);
    pendingRefetch();
  };

  const inactivePageHandler = (pageNumber: number) => {
    setInactivePage(pageNumber);
    inactiveRefetch();
  };

  const allPageHandler = (pageNumber: number) => {
    setWaitingPage(pageNumber);
    setPendingPage(pageNumber);
    setInactivePage(pageNumber);

    waitingRefetch();
    pendingRefetch();
    inactiveRefetch();
  };

  return (
    <>
      {mounted && (
        <G.TableContainer className="content">
          <G.Table>
            {content}

            <tbody>
              {/* ---------------------- 전체 ----------------------*/}

              {category === 'all' && '매니저 신청 관리' && (
                <tr>
                  <S.Title colSpan={11}>매니저 신청 관리</S.Title>
                </tr>
              )}
              {category === 'all' &&
                managerDummyData.map((data: ManagerDummyDataType, index: number) => (
                  <ActiveManagerItem key={index} activeManager={data} />
                ))}

              {pending && category === 'all' && '보류 매니저' && (
                <tr>
                  <S.Title colSpan={11}>보류 매니저</S.Title>
                </tr>
              )}
              {pending &&
                category === 'all' &&
                pending?.map((manager: any, index: number) => <ManagerItem key={index} data={manager} />)}

              {inactive && category === 'all' && '활동 불가 매니저' && (
                <tr>
                  <S.Title colSpan={11}>활동 불가 매니저</S.Title>
                </tr>
              )}
              {inactive &&
                category === 'all' &&
                inactive?.map((manager: any, index: number) => <ManagerItem key={index} data={manager} />)}

              {/* ---------------------- 매니저 신청 관리 ----------------------*/}

              <G.Table>
                <colgroup>
                  <col width="5%" />
                  <col width="15%" />
                  <col width="30%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>

                {category === 'waiting' && (
                  <G.Thead>
                    <tr>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        이름
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        연락처
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        활동지역
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        레벨
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        자격증
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        운전여부
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        지원 폼
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        예약 내역
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        상태
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        메모
                      </M.ManagerTh>
                    </tr>
                  </G.Thead>
                )}

                {category === 'waiting' && (
                  <ManagerItem
                    data={{
                      name: '노길동',
                      phoneNumber: '010-7777-2222',
                      activityRegion: ['서울 강북구', '경기 광명시'],
                      level: 3,
                      certificate: '1급 (off)',
                      vehicle: '가능',
                      status: '대기',
                    }}
                  />
                )}

                {waiting && category === 'waiting' && (
                  <PaginationContainer style={{ position: 'absolute', right: '24px' }}>
                    <Pagination
                      hideFirstLastPages={true}
                      linkClassPrev="prev"
                      linkClassNext="next"
                      activePage={1}
                      itemsCountPerPage={3}
                      totalItemsCount={3}
                      pageRangeDisplayed={Math.ceil(3 / 10)}
                      onChange={waitingPageHandler}
                    />
                  </PaginationContainer>
                )}
              </G.Table>
              {/* ---------------------- 보류 매니저 ----------------------*/}
              <G.Table>
                <colgroup>
                  <col width="5%" />
                  <col width="15%" />
                  <col width="30%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>

                {category === 'pending' && (
                  <G.Thead>
                    <tr>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        이름
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        연락처
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        활동지역
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        레벨
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        자격증
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        운전여부
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        지원 폼
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        예약 내역
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        상태
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        메모
                      </M.ManagerTh>
                    </tr>
                  </G.Thead>
                )}
                {/* 기존 매니저 */}
                {category === 'pending' && (
                  <tr>
                    <S.Title colSpan={11}>기존 매니저</S.Title>
                  </tr>
                )}
                {category === 'pending' &&
                  pendingDummyData.map((data: ManagerDummyDataType, index: number) => (
                    <ManagerItem key={index} data={data} />
                  ))}

                {/* 예비 매니저 */}
                {category === 'pending' && (
                  <tr>
                    <S.Title colSpan={11}>예비 매니저</S.Title>
                  </tr>
                )}
                {/* {category === 'pending' &&
                  prevWaitingPending?.map((manager: any, index: number) => <ManagerItem key={index} data={manager} />)} */}
              </G.Table>

              {pending && category === 'pending' && (
                <PaginationContainer style={{ position: 'absolute', right: '24px' }}>
                  <Pagination
                    hideFirstLastPages={true}
                    linkClassPrev="prev"
                    linkClassNext="next"
                    activePage={pendingPage}
                    itemsCountPerPage={10}
                    totalItemsCount={pendingTotal}
                    pageRangeDisplayed={Math.ceil(pendingTotal / 10)}
                    onChange={pendingPageHandler}
                  />
                </PaginationContainer>
              )}

              {/* ---------------------- 활동 불가 ----------------------*/}
              <G.Table>
                <colgroup>
                  <col width="5%" />
                  <col width="15%" />
                  <col width="30%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>

                {category === 'inactive' && (
                  <G.Thead>
                    <tr>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        이름
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        연락처
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        활동지역
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        레벨
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        자격증
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        운전여부
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        지원 폼
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        예약 내역
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        상태
                      </M.ManagerTh>
                      <M.ManagerTh scope="col" style={{ textAlign: 'left' }}>
                        메모
                      </M.ManagerTh>
                    </tr>
                  </G.Thead>
                )}

                {/* 기존 매니저 */}
                {category === 'inactive' && (
                  <tr>
                    <S.Title colSpan={11}>기존 매니저</S.Title>
                  </tr>
                )}
                {category === 'inactive' &&
                  inactiveDummyData.map((data: ManagerDummyDataType, index: number) => (
                    <ManagerItem key={index} data={data} />
                  ))}

                {/* 예비 매니저 */}
                {category === 'inactive' && (
                  <tr>
                    <S.Title colSpan={11}>예비 매니저</S.Title>
                  </tr>
                )}
                {category === 'inactive' &&
                  prevWaitingInActive?.map((manager: any, index: number) => <ManagerItem key={index} data={manager} />)}

                {category === 'inactive' && (
                  <PaginationContainer style={{ position: 'absolute', right: '24px' }}>
                    <Pagination
                      hideFirstLastPages={true}
                      linkClassPrev="prev"
                      linkClassNext="next"
                      activePage={inactivePage}
                      itemsCountPerPage={10}
                      totalItemsCount={inactiveTotal}
                      pageRangeDisplayed={Math.ceil(inactiveTotal / 10)}
                      onChange={inactivePageHandler}
                    />
                  </PaginationContainer>
                )}
              </G.Table>
            </tbody>
          </G.Table>
        </G.TableContainer>
      )}
    </>
  );
}

export default ManagerTable;
