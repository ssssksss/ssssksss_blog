declare interface IBlog2FirstCategory {
  id: number;
  name: string;
  userId: number;
  blog2SecondCategoryList?: IBlog2SecondCategoryList[];
}
declare interface IBlog2SecondCategoryList {
  blogCount: number;
  id: number;
  name: string;
  thumbnailImageUrl: string;
  userId: number;
}

declare interface responseCreateBlog2FirstCategory {
  status: number;
  msg: string;
  data: IBlog2FirstCategory;
}

declare interface responseCreateBlog2SecondCategory {
  status: number;
  msg: string;
  data: {
    createBlog2SecondCategory: ISecondCategory;
  };
}

declare interface responseUpdateBlog2SecondCategory {
  status: number;
  msg: string;
  data: ISecondCategory;
}

interface ISecondCategory {
  blogCount: number;
  id: number;
  name: string;
  thumbnailImageUrl: string;
}

declare interface responseCreateUpdateBlog2BasicContent {
  status: number;
  msg: string;
  data: {
    blog2BasicContent: IBlog2BasicContent;
  };
}

declare interface IBlog2BasicContent {
  blog2FirstCategoryId: number;
  blog2SecondCategoryId: number;
  content: string;
  id: number;
  title: string;
  // 내용 추가 필요
}
declare interface responseSearchBlog2BasicContentList {
  status: number;
  msg: string;
  data: {
    blog2BasicList: {
      content: IBlog2BasicContent[];
      pageable: Pageable;
      last: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      size: number;
      number: number;
      sort: Sort;
      numberOfElements: number;
      empty: boolean;
    };
  };
}

declare interface resBlog2Create {
  status: number;
  msg: string;
  data: IBlog2;
}

// readBlog2List

declare interface responseBlog2List {
  data: IBlog2[];
  msg: string;
  statusCode: number;
}

declare interface IBlog2 {
  id: number;
  title: string;
  description: string;
  userId: number;
  firstCategoryId: number;
  thumbnailImageUrl: string;
  createdAt: string;
  modifiedAt: string;
  deleteAt: string;
  accessYn: boolean;
  blog2Status: string; // 블로그 상태가 여러 개일 수 있음을 고려
}

// readBlog2

declare interface responseReadBlog2 {
  blog2: IBlog2;
  blog2SecondCategory: ISecondCategory;
  blog2BasicList: IBlog2Basic[];
  blog2StructureList: IBlog2Structure[];
  blog2ResultList: IBlog2Result[];
}

declare interface IBlog2Basic {
  id: number;
  position: number;
  blog2BasicContent: IBlog2BasicContent;
}

declare interface ResBlog2Update {
  blog2: IBlog2;
  blog2SecondCategory: ISecondCategory;
  blog2BasicList: IBlog2Basic[];
  blog2StructureList: IBlog2Structure[];
  blog2ResultList: IBlog2Result[];
  categoryList: IBlog2FirstCategory[];
}

// structure

declare interface IBlog2Structure {
  id: number;
  position: number;
  blog2StructureContent: IBlog2StructureContent;
}
declare interface IBlog2StructureContent {
  id: number;
  content: string;
  directory: string;
  project: string;
  // 내용 추가 필요
}

declare interface responseSearchBlog2StructureContentList {
  status: number;
  msg: string;
  data: {
    blog2StructureContentList: {
      content: IBlog2StructureContent[];
      pageable: Pageable;
      last: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      size: number;
      number: number;
      sort: Sort;
      numberOfElements: number;
      empty: boolean;
    };
  };
}

declare interface responseCreateUpdateBlog2StructureContent {
  status: number;
  msg: string;
  data: {
    blog2StructureContent: IBlog2StructureContent;
  };
}

// result

declare interface IBlog2Result {
  id?: number;
  position: number;
  content: string;
  title: string;
}

declare interface responseCreateUpdateBlog2Result {
  status: number;
  msg: string;
  data: {
    blog2Result: IBlog2Result;
  };
}

// 공통 시간
interface BaseTimeEntity {
  createdAt: string;
  modifiedAt: string;
  deleteAt: string;
  accessYn: boolean;
}

// Sort 타입 정의
interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// Pageable 타입 정의
interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}