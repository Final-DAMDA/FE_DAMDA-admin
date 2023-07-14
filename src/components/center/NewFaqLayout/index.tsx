import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FAQData } from '@/types/api/center';
import { useRouter } from 'next/router';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Modal from '../Modal';
import CategoryDropdown from '../CategoryDropdown';

import * as S from './style';

// interface NewFaqLayoutProps {
//   mutate: UseMutateFunction<boolean, AxiosError, FAQData>;
// }

function NewFaqLayout() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FAQData>();

  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGobackClicked, setIsGobackClicked] = useState(false);
  const [isRegistrationClicked, setIsRegistrationClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('유형을 선택해주세요.');
  const [isDisabled, setIsDisabled] = useState(true);

  const gobackHandler = () => {
    setIsGobackClicked(true);
  };

  const registerHandler = () => {
    setIsRegistrationClicked(true);
  };

  const selectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.innerText);
    setIsDropdownOpen(false);
  };

  const onSubmit = (data: FAQData) => {
    let transformedCategory;

    switch (selectedCategory) {
      case '가격':
        transformedCategory = 'PRICE';
        break;

      case '서비스 관련':
        transformedCategory = 'SERVICE';
        break;

      case '기타':
        transformedCategory = 'ETC';
        break;

      default:
        break;
    }

    const formData = {
      title: data.title,
      qnaCategory: transformedCategory,
      contents: data.contents,
    };
    // mutate(formData);

    // api 요청 작성
    router.push('/center');
    console.log(formData);
  };

  useEffect(() => {
    if (watch('title').length !== 0 && selectedCategory !== '유형을 선택해주세요.' && watch('contents').length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [watch('title'), selectedCategory, watch('contents')]);

  return (
    <div>
      <S.Title>FAQ 작성</S.Title>

      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.FormWrapper>
          <strong className="title">제목</strong>
          <input type="text" id="title" placeholder="제목을 입력해주세요." {...register('title', { required: true })} />
        </S.FormWrapper>

        <S.FormWrapper>
          <strong className="category">유형</strong>
          <CategoryDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            selectedCategory={selectedCategory}
            selectHandler={selectHandler}
          />
        </S.FormWrapper>

        <S.FormWrapper>
          <strong className="contents">내용</strong>
          <textarea id="" placeholder="내용을 입력해주세요." {...register('contents', { required: true })}></textarea>
        </S.FormWrapper>

        <S.ButtonGroup>
          <button type="button" onClick={gobackHandler}>
            이전으로
          </button>
          <S.SubmitButton type="button" onClick={registerHandler} disabled={isDisabled}>
            등록하기
          </S.SubmitButton>
        </S.ButtonGroup>

        {isGobackClicked && (
          <Modal
            title="돌아가기"
            description="이전 화면으로 돌아가면 현재 화면에서 작성중인 내용이 사라집니다. 이전 화면으로 돌아가시겠습니까?"
            setIsGobackClicked={setIsGobackClicked}
          />
        )}
        {isRegistrationClicked && (
          <Modal
            title="등록"
            description="선택하신 항목을 등록하시겠습니까?"
            setIsRegistrationClicked={setIsRegistrationClicked}
          />
        )}
      </S.FormContainer>
    </div>
  );
}

export default NewFaqLayout;
