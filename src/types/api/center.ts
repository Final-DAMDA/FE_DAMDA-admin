export interface CenterData {
  qnaId: number;
  title: string;
  qnaCategory: string;
  contents: string;
}

export interface FAQData {
  title: string;
  qnaCategory: string | any;
  contents: string;
}

export interface FAQResponse extends FAQData {
  qnaId: number;
}
