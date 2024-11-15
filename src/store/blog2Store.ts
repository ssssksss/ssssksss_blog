import {StateCreator, create} from "zustand";
import {devtools} from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface Blog2State {
  categoryList: IBlog2FirstCategory[];
  blog2List: {
    blog2SecondCategoryId: number;
    list: IBlog2[];
  };
}

// 2. 액션 인터페이스 정의
interface BlogActions {
  initialize: () => void;
  setBlog2List: (data: {id: number; list: IBlog2[]}) => void;
  setBlog2CategoryList: (data: IBlog2FirstCategory[]) => void;
}

// 3. 초기 상태 정의
const initialState: Blog2State = {
  categoryList: [],
  blog2List: {
    blog2SecondCategoryId: 0,
    list: [],
  },
};

// 4. 상태 및 액션 생성
const blog2Store: StateCreator<Blog2State & BlogActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setBlog2List: (data) =>
    set(() => ({
      blog2List: {
        blog2SecondCategoryId: data.id,
        list: data.list,
      },
    })),
  setBlog2CategoryList: (data) =>
    set(() => ({
      categoryList: data,
    })),
});

const useBlog2Store = create<Blog2State & BlogActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(blog2Store) : blog2Store,
);

export type useBlog2StoreType = Blog2State & BlogActions;

export default useBlog2Store;