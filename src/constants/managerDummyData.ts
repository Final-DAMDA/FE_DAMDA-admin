import { ManagerDummyDataType } from '@/types/managerDummyData';

export const managerDummyData: ManagerDummyDataType[] = [
  {
    name: '홍길동',
    phoneNumber: '010-0000-0000',
    activityRegion: ['서울 동대문구', '서울 강남구'],
    level: 5,
    certificate: '1급 (off)',
    vehicle: '가능',
  },
  {
    name: '김길동',
    phoneNumber: '010-1111-1111',
    activityRegion: ['서울 금천구'],
    level: 3,
    certificate: '1급 (off)',
    vehicle: '가능',
  },
  {
    name: '최길동',
    phoneNumber: '010-2222-2222',
    activityRegion: ['서울 관악구', '서울 동작구'],
    level: 1,
    certificate: '2급 (off)',
    vehicle: '불가능',
  },
];

export const waitingDummyData: ManagerDummyDataType[] = [
  {
    name: '박길동',
    phoneNumber: '010-0000-0000',
    activityRegion: ['서울 동대문구', '서울 강남구'],
    level: 5,
    certificate: '1급 (off)',
    vehicle: '가능',
    status: '대기',
  },
];

export const pendingDummyData: ManagerDummyDataType[] = [
  {
    name: '배길동',
    phoneNumber: '010-0000-0000',
    activityRegion: ['서울 동대문구', '서울 강남구'],
    level: 5,
    certificate: '1급 (off)',
    vehicle: '가능',
    status: '보류',
  },
];

export const inactiveDummyData: ManagerDummyDataType[] = [
  {
    name: '표길동',
    phoneNumber: '010-0000-0000',
    activityRegion: ['서울 동대문구', '서울 강남구'],
    level: 5,
    certificate: '1급 (off)',
    vehicle: '가능',
    status: '활동 불가',
  },
];
