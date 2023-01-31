import Link from "next/link";
import Cart from "../cart/Cart";
import {selectCartItems} from "@/redux/slices/cartItemsSlice";
import React,{useEffect, useState} from "react";
import { useSelector } from 'react-redux';
// import {AnimatePresence, motion} from 'framer-motion';
const {AnimatePresence, motion} = require('framer-motion');
import {fadeDownAnim} from "@/lib/animations";

export default function Nav(){
	
	const qty = useSelector(selectCartItems)
	const [activeCart, setActiveCart] = useState<boolean>(false);
	const [scrollNav, setScrollNav] = useState<boolean>(false);

	const handleShowCart = () => {
		setActiveCart(!activeCart);
	}
	
	const changeNav = () => {
		if(window.scrollY >= 80 ){
			setScrollNav(true);
		}else {
			setScrollNav(false);
		}
	};
	
	useEffect(() => {
		window.addEventListener("scroll", changeNav)
	})
	
	return(
		<header className={scrollNav ? "scrolled" : ""}>
			<div className="container">
				<nav>
					<Link className="font-bold text-2xl italic" href={"/"}>Spilus</Link>
					<div>
						<div className="cursor-pointer" onClick={handleShowCart}>
							<i className="icon-shopping_bag">
								{qty.cartTotalQty > 0 ? (
									<motion.span
										initial={fadeDownAnim.hidden}
										animate={fadeDownAnim.show}
										transition={{delay: .4}}
									>{qty.cartTotalQty}
									</motion.span>
								) : null}
							</i>
						</div>
					</div>
				</nav>
				<AnimatePresence>
					{activeCart ? (<Cart handleShowCart={handleShowCart} />) : null}
				</AnimatePresence>
			</div>
		</header>
		)
}