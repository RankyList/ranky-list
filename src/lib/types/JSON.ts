export type JSONElement<T = undefined> = {
	data?: T;
	id?: string;
	label?: string;
};

export type JSONTierlistItem = JSONElement<{
	color?: string | null;
	imageUrl?: string;
}>;

export type JSONTierlistRow = JSONElement<{
	className?: string;
	color?: string | null;
	items?: JSONTierlistItem[];
}>;
