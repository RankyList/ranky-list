export type tierlistItem = {
    description: string;
    id: string;
    image: string;
    title: string;
}

export type tierlistRank = {
    color: string;
    description: string;
    id: string;
    items: tierlistItem[];
    title: string;
}