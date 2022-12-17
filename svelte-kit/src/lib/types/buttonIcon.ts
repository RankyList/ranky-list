import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type Variant = {
    color: string;
    icon: IconDefinition;
};

export type Variants = {
    add: Variant;
    edit: Variant;
    delete: Variant;
    ok: Variant;
    cancel: Variant;
};