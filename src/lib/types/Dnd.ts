import type { Uuid } from './Uuid';

export type DndItem<T = undefined> = {
	data: T;
	id: Uuid;
	isDndShadowItem?: boolean;
	label?: string;
};

export type TierlistItemType = DndItem<{
	color: string | null;
	imageUrl?: string;
}>;

export type TierlistRowType = DndItem<{
	className?: string;
	color: string | null;
	items: TierlistItemType[];
}>;
