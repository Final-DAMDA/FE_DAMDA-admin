import React from 'react';

import ActiveManagerItem from '../ActiveManagerItem';

import * as G from '@/styles/common/table.style';
import * as M from '../style';
import { ManagerType } from '@/types/manager';
import { managerDummyData } from '@/constants/managerDummyData';
import { ManagerDummyDataType } from '@/types/managerDummyData';

// interface ActiveManagerProps {
//   activeManagers: ManagerType[];
// }

function ActiveManager() {
  return (
    <M.ManagerTableContainer>
      <G.Table>
        <colgroup>
          <col width="5%" />
          <col width="15%" />
          <col width="30%" />
          <col width="15%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>

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

        <tbody>
          {/* {activeManagers?.map((activeManager: ManagerType) => (
            <ActiveManagerItem key={activeManager.id} activeManager={activeManager} />
          ))} */}
          {managerDummyData.map((data: ManagerDummyDataType, index: number) => (
            <ActiveManagerItem key={index} activeManager={data} />
          ))}
        </tbody>
      </G.Table>
    </M.ManagerTableContainer>
  );
}

export default ActiveManager;
