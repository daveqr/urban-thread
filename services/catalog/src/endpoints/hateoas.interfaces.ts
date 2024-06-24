export interface Link {
    href: string;
    rel?: string;
    name?: string;
}

export interface ResourceLinks {
    self: Link;

    [key: string]: Link;
}

