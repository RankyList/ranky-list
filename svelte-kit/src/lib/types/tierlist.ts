export type TierlistItemType = {
    description: string;
    id: string;
    image: string;
    position: number;
    title: string;
}

export type TierlistRankType = {
    color: string;
    description: string;
    id: string;
    items: TierlistItemType[];
    title: string;
    position: number;
}
