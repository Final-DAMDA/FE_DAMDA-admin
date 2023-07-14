import React, { ChangeEvent, RefObject, createRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { citiesData } from '@/constants/locationData';

import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import * as S from './style';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteManagerRegion, putManagerRegion } from '@/api/manager';

function LocationSelectionForm({ region, id }: any) {
  const cityCheckboxRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(putManagerRegion, {
    onSuccess() {
      queryClient.invalidateQueries(['managers']);
    },
  });
  const { mutate: deleteRegion } = useMutation(deleteManagerRegion, {
    onSuccess() {
      queryClient.invalidateQueries(['managers']);
    },
  });

  const [isLocationOptionsOpen, setIsLocationOptionsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const listRef: RefObject<HTMLDivElement> = createRef();

  const regionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(e.target.value);
  };

  // const cityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const district = e.target.value;
  //   const isChecked = e.target.checked;

  //   if (isChecked) {
  //     if (selectedRegion === '서울특별시') {
  //       mutate({ id, region: { SEOUL: district } });
  //     } else if (selectedRegion === '경기도') {
  //       mutate({ id, region: { GYEONGGI: district } });
  //     }
  //   } else {
  //     // const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;

  //     const checkedCount = region.서울특별시.length + region.경기도.length;

  //     if (checkedCount > 0) {
  //       if (selectedRegion === '서울특별시') {
  //         deleteRegion({ id, region: { SEOUL: district } });
  //       } else if (selectedRegion === '경기도') {
  //         deleteRegion({ id, region: { GYEONGGI: district } });
  //       }
  //     } else {
  //       e.target.checked = true;
  //     }
  //   }
  // };

  // 지역 태그
  const seoul = region?.서울특별시.map((seoul: string, index: number) => <div key={index}>서울 {seoul}</div>);

  const gyeonggi = region?.경기도.map((gyeonggi: string, index: number) => <div key={index}>경기 {gyeonggi}</div>);

  return (
    <S.LocationSelectionForm>
      {/* 지역 태그 */}
      <S.SelectedLocation>
        {seoul}
        {gyeonggi}
      </S.SelectedLocation>

      <div style={{ position: 'relative' }}>
        {/* Select Button */}
        <S.SelectButton
          type="button"
          region={selectedRegion}
          isOptionsOpen={isLocationOptionsOpen}
          onClick={(e) => {
            e.stopPropagation();
            setIsLocationOptionsOpen(!isLocationOptionsOpen);
          }}
        >
          <div className="select-region">
            지역 선택
            {isLocationOptionsOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>

          <div className="select-detail">
            <span>{selectedRegion === '서울특별시' ? '서울특별시' : '경기도'}</span>

            <span>
              세부 선택
              <BsChevronUp />
            </span>
          </div>
        </S.SelectButton>

        {/* Options */}
        {isLocationOptionsOpen && (
          <S.ListWrapper ref={listRef}>
            <ul onClick={(e) => e.stopPropagation()}>
              <li>
                <input
                  type="radio"
                  name="manager_available_region"
                  id="seoul"
                  value="서울특별시"
                  onClick={(e) => e.stopPropagation()}
                  onChange={regionChangeHandler}
                />
                <label htmlFor="seoul">서울특별시</label>
              </li>

              <li>
                <input
                  type="radio"
                  name="manager_available_region"
                  id="gyeonggi"
                  value="경기도"
                  onClick={(e) => e.stopPropagation()}
                  onChange={regionChangeHandler}
                />
                <label htmlFor="gyeonggi">경기도</label>
              </li>
            </ul>

            {isLocationOptionsOpen && selectedRegion && citiesData[selectedRegion] && (
              <ul onClick={(e) => e.stopPropagation()}>
                {citiesData[selectedRegion].map((district: string) => (
                  <li key={district}>
                    <input
                      type="checkbox"
                      name="manager_available_district"
                      id={district}
                      value={district}
                      // checked={region[selectedRegion].includes(district)}
                      onClick={(e) => e.stopPropagation()}
                      // onChange={cityChangeHandler}
                      ref={cityCheckboxRef}
                    />
                    <label htmlFor={district}>{district}</label>
                  </li>
                ))}
              </ul>
            )}
          </S.ListWrapper>
        )}
      </div>
    </S.LocationSelectionForm>
  );
}

export default LocationSelectionForm;
