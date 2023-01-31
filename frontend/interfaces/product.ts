export interface ProductsType{
    attributes: {
        title: string,
        description: string,
        slug: string,
        price: number,
        images: {
            data:[{
                attributes:{
                    formats:{
                    }
                }
            }]
        }
    }
}

export interface ProductType{
    product:{
        attributes:{
            title: string,
            description: string,
            slug: string,
            price: number,
            images: {
                data:[{
                    attributes:{
                        formats:{
                            thumbnail?:{
                                url: string,
                                name: string
                            },
                            large?:{
                                url: string,
                                name: string
                            },
                            medium?:{
                                url: string,
                                name: string
                            },
                            small?:{
                                url: string,
                                name: string
                            },

                        }
                    }
                }]
            }
        }
    }
}

export interface CartProductType{
    title: string,
    description: string,
    images?: {
        data:[{
            attributes:{
                formats:{
                    thumbnail?:{
                        url: string,
                        name: string
                    },
                    large?:{
                        url: string,
                        name: string
                    },
                    medium?:{
                        url: string,
                        name: string
                    },
                    small?:{
                        url: string,
                        name: string
                    },

                }
            }
        }]
    },
    price: number,
    slug: string,
    cartQty: number
}

export interface ImageType{
    attributes:{
        formats:{
            thumbnail?:{
                url: string,
                name: string
            },
            large?:{
                url: string,
                name: string
            },
            medium?:{
                url: string,
                name: string
            },
            small?:{
                url: string,
                name: string
            },

        }
    }
}