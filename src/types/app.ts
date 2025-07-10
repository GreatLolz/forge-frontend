interface Breadcrumbs {
    [key: string]: {
        href: string,
        name: string
    }[]
}

export const BREADCRUMBS: Breadcrumbs = {
    "/": [
        { href: "/", name: "Home" }
    ],
    "/datasets": [
        { href: "/", name: "Home" },
        { href: "/datasets", name: "Datasets" }
    ],
    "/datasets/create": [
        { href: "/", name: "Home" },
        { href: "/datasets", name: "Datasets" },
        { href: "/datasets/create", name: "Create" }
    ],
}