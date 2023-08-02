// src/types/goodDeed.ts

// Тип данных для хорошего дела
export interface GoodDeed {
    id?: number | any;
    title: string;
    content: string;
}

export interface GoodDeedsState {
    goodDeeds: GoodDeedList;
    loading: boolean;
    error: string | null;
}

export type GoodDeedList = GoodDeed[];
