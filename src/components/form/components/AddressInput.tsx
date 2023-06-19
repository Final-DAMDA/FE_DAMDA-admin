import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServiceAvailableLocation } from '@/api/form';
import { FormAddressWrapper } from '@/styles/pages/form/form.styled';
import { FormAddressProps } from '@/types/components/form';
import { AiOutlineDown } from 'react-icons/ai';
import { motion, Variants } from 'framer-motion';
import { AdditionalInfo } from '@/types/api/form';

const variants: Variants = {
  hover: {
    border: '2px solid #00BDFF',
  },
};

function AddressInput({ formData }: FormAddressProps) {
  const { data, isLoading } = useQuery(['address'], getServiceAvailableLocation);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [currentAddressInfo, setCurrentAddressInfo] = useState<AdditionalInfo[]>([]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const getArrayByIndex = (index: number): AdditionalInfo[] | undefined => {
    if (!data) return undefined;

    const keys = Object.keys(data);

    if (index >= 0 && index < keys.length) {
      return data[keys[index]];
    }

    return undefined;
  };

  useEffect(() => {
    if (selectedIndex === undefined) return;
    const addressInfo = getArrayByIndex(selectedIndex);
    if (addressInfo) {
      setCurrentAddressInfo(addressInfo);
    }
  }, [selectedIndex]);

  return (
    <FormAddressWrapper>
      <h1>{formData.questionTitle}</h1>

      <div className="address-list">
        {data && (
          <>
            <div className="address-item">
              <div className="address-wrapper">
                지역 선택 <AiOutlineDown />
              </div>
              <div className="address-list-item">
                {Object.keys(data).map((key, index) => (
                  <motion.span
                    key={key}
                    variants={variants}
                    whileHover="hover"
                    onClick={() => handleClick(index)}
                    animate={selectedIndex === index ? 'hover' : ''}
                  >
                    {key}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="address-item">
              <div className="address-wrapper">
                지역 선택 <AiOutlineDown />{' '}
              </div>
              <div className="address-list-item">
                {selectedIndex === undefined ? <span>지역을 선택하여 시도를 확인 할 수 있습니다.</span> : null}
                {currentAddressInfo.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="input">
          <span>상세 주소</span>
          <input type="text" placeholder="동, 호수까지 입력해주세요." />
        </div>
      </div>
    </FormAddressWrapper>
  );
}

export default AddressInput;