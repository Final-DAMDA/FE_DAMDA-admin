import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getFAQData, putFAQData } from '@/api/center';
import CategoryDropdown from '../CategoryDropdown';

import * as N from '@/components/center/NewFaqLayout/style';
import * as S from './style';
import { FAQData } from '@/types/api/center';

interface ModalProps {
  id?: number;
  type?: string;
  title?: string;
  contents?: string;
  description?: string;
  qnaId?: number;
  faq?: string;
  setIsGobackClicked?: (isOpen: boolean) => void;
  setIsRegistrationClicked?: (isOpen: boolean) => void;
  setIsFaqClicked?: (isOpen: boolean) => void;
}

function Modal({
  id,
  type,
  title,
  contents,
  description,
  qnaId,
  faq,
  setIsGobackClicked,
  setIsRegistrationClicked,
  setIsFaqClicked,
}: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FAQData>();

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: singleFAQ } = useQuery(['faq', qnaId], () => getFAQData(qnaId));
  const { mutate } = useMutation(putFAQData, {
    onSuccess(data) {
      queryClient.setQueryData(['faq', qnaId], data);
    },
  });

  const [isInputEditing, setIsInputEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(singleFAQ?.data.qnaCategory);

  const selectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.innerText);
    setIsDropdownOpen(false);
  };

  const closeHandler = () => {
    if (title === '돌아가기' && setIsGobackClicked) setIsGobackClicked(false);
    else if (title === '등록' && setIsRegistrationClicked) {
      setIsRegistrationClicked(false);
    } else if (faq && setIsFaqClicked) {
      setIsFaqClicked(false);
    }
  };

  const mainHandler = () => {
    if (title === '돌아가기') router.push('/center');
    else if (faq) setIsInputEditing(true);
  };

  let transformedCategory;
  if (faq) {
    switch (type) {
      case 'PRICE':
        transformedCategory = '가격';
        break;

      case 'SERVICE':
        transformedCategory = '서비스 관련';
        break;

      case 'ETC':
        transformedCategory = '기타';
        break;

      default:
        break;
    }

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
          transformedCategory = type;
          break;
      }

      // const formData = {
      //   title: data.title,
      //   qnaCategory: transformedCategory,
      //   contents: data.contents,
      // };
      // console.log(formData);
      // mutate({ id: qnaId, faq: formData });
    };

    return (
      <S.Overlay>
        <S.Modal>
          <S.ModalHeader>
            <h2>{singleFAQ?.data.title}</h2>
            <button onClick={closeHandler}>
              <Image src="/icons/close-icon.svg" alt="close-icon" width={24} height={24} />
            </button>
          </S.ModalHeader>

          {isInputEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <S.Info>
                <div>
                  <dt>제목</dt>
                  <dd>
                    {isInputEditing ? (
                      <input
                        className="title"
                        type="text"
                        {...register('title', { required: true })}
                        defaultValue={title}
                        autoFocus
                      />
                    ) : (
                      singleFAQ?.data.title
                    )}
                  </dd>
                </div>

                <div>
                  <dt>유형</dt>
                  <dd className="types">
                    {isInputEditing ? (
                      <N.FormWrapper size="small">
                        <CategoryDropdown
                          defaultType={type}
                          size="small"
                          isDropdownOpen={isDropdownOpen}
                          setIsDropdownOpen={setIsDropdownOpen}
                          selectedCategory={selectedCategory}
                          qnaCategory={type}
                          selectHandler={selectHandler}
                        />
                      </N.FormWrapper>
                    ) : (
                      transformedCategory
                    )}
                  </dd>
                </div>

                <div>
                  <dt>내용</dt>
                  <dd>
                    {isInputEditing ? (
                      <textarea
                        className="contents"
                        {...register('contents', { required: true })}
                        defaultValue={contents}
                      ></textarea>
                    ) : (
                      singleFAQ?.data.contents
                    )}
                  </dd>
                </div>
              </S.Info>

              <S.ButtonGroup>
                <button onClick={closeHandler}>취소</button>
                <button type={faq ? 'submit' : 'button'} onClick={mainHandler}>
                  {isInputEditing ? '적용' : '수정'}
                </button>
              </S.ButtonGroup>
            </form>
          ) : (
            <>
              <S.Info>
                <div>
                  <dt>제목</dt>
                  <dd>
                    {isInputEditing ? <input type="text" defaultValue={singleFAQ?.data.title} autoFocus /> : title}
                  </dd>
                </div>

                <div>
                  <dt>유형</dt>
                  <dd>{isInputEditing ? selectedCategory : type}</dd>
                </div>

                <div>
                  <dt style={{ whiteSpace: 'nowrap' }}>내용</dt>
                  <dd>{isInputEditing ? <textarea defaultValue={contents}></textarea> : contents}</dd>
                </div>
              </S.Info>

              <S.ButtonGroup>
                <button onClick={closeHandler}>취소</button>
                <button type="button" onClick={mainHandler}>
                  수정
                </button>
              </S.ButtonGroup>
            </>
          )}
        </S.Modal>
      </S.Overlay>
    );
  }

  return (
    <S.Overlay>
      <S.Modal>
        <S.ModalHeader>
          <h2>{title}</h2>
          <button onClick={closeHandler}>
            <Image src="/icons/close-icon.svg" alt="close-icon" width={24} height={24} />
          </button>
        </S.ModalHeader>

        <p>{description}</p>

        <S.ButtonGroup>
          <button onClick={closeHandler}>취소</button>
          <button type={title === '등록' ? 'submit' : 'button'} onClick={mainHandler}>
            {title}
          </button>
        </S.ButtonGroup>
      </S.Modal>
    </S.Overlay>
  );
}

export default Modal;
