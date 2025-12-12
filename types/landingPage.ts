export interface NavbarMenu {
    label: string;
    link: string;
    _id?: string;
}

export interface Navbar {
    logo: string;
    menus: NavbarMenu[];
}

export interface HeroCTA {
    label: string;
    link: string;
}

export interface Hero {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    cta: HeroCTA;
}

export interface About {
    title: string;
    description: string;
    image: string;
}

export interface ProductItem {
    name: string;
    description: string;
    price: number;
    image: string;
    _id?: string;
}

export interface Products {
    title: string;
    description: string;
    items: ProductItem[];
}

export interface SocialLink {
    platform: string;
    url: string;
    _id?: string;
}

export interface Footer {
    description: string;
    socialLinks: SocialLink[];
    copyright: string;
}

export interface LandingPage {
    _id: string;
    navbar: Navbar;
    hero: Hero;
    about: About;
    products: Products;
    footer: Footer;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface LandingPageResponse {
    success: boolean;
    data: LandingPage;
    message?: string;
}

export interface UpdateLandingPageData {
    navbar: Navbar;
    hero: Hero;
    about: About;
    products: Products;
    footer: Footer;
}
