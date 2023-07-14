import { Td } from '@/styles/common/table.style';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ManagerTd = styled(Td)`
  position: relative;
  padding: 0 12px;
  text-align: left;

  &.location-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    row-gap: 4px;
  }

  textarea {
    position: absolute;
    top: 58px;
    right: 18px;
    z-index: 10;
  }
`;

export const StateChangeContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 12px;
  z-index: 10;

  div {
    width: 104px;
    cursor: pointer;
  }
`;

export const CertificateForm = styled.div<{ size?: string }>`
  ul {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    padding-top: 17px;
    z-index: 20;
    border: 1px solid #000000;
    border-radius: 5px;
    background-color: #ffffff;
    overflow: hidden;

    ${({ size }) =>
      size === 'small' &&
      css`
        width: 50px;
        padding-top: 0;

        button {
          padding: 0;
          text-align: center;
        }
      `}
  }
`;

export const OptionButton = styled.button`
  width: 100%;
  height: 51px;
  padding: 0 32px;
  border: none;
  color: #000000;
  background-color: #ffffff;
  outline: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #ccecff;
  }
`;

export const InputWrapper = styled.div<{ isError?: string }>`
  position: absolute;
  bottom: -415px;
  left: -50%;
  width: 200px;
  z-index: 20;

  input {
    width: 100%;
    height: 61px;
    padding: 16px 54px 10px 16px;
    border: 1px solid ${({ theme, isError }) => (isError ? theme.colors.red_1 : theme.colors.yolda_black_1)};
    border-radius: 5px;
    font-size: 16px;
    font-weight: 800;
    line-height: 135%;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.yolda_gray_5};
      font-size: 16px;
      font-weight: 800;
      line-height: 135%;
    }
  }

  button {
    position: absolute;
    right: 12px;
    bottom: 16px;
    padding: 2px 4px;
  }
`;
