export const fadeDownAnim = {
    hidden: {
        y: "-10px", opacity: 0, scale: .8
    },
    show:{
        y: "0",opacity: 1, scale: 1
    }
}
export const cartItemAnim = {
    hidden: {
        opacity: 0, scale: .8, x: "20%"
    },
    show: {
        opacity: 1, scale: 1, x: "0%"
    }
}
export const cartItemsAnim = {
    hidden: {opacity: 1},
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.15,
        }
    }
}
export const fadeLeftAnim = {
    hidden:{
        opacity: 0, x: "50%"
    },
    show:{
        opacity: 1, x: "0%",
    },

}
export const fadeRightAnim = {
    hidden:{
        opacity: 0, x: "-50%"
    },
    show:{
        opacity: 1, x: "0%",
    },

}
export const popUpAnim = {
    hidden:{
        opacity: 0, scale: 0.8
    },
    show:{
        opacity: 1, scale: 1
    }

}