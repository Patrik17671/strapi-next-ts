import {useQuery} from "urql";
import {GET_PRODUCT_QUERY} from "@/query/query";
import {useRouter} from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import {addToCart, getTotals, selectCartItems} from "@/redux/slices/cartItemsSlice";
import {useEffect, useState} from "react";
import {motion} from'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import {CartProductType, ImageType} from "@/interfaces/product";
import {fadeLeftAnim, fadeRightAnim} from "@/lib/animations";

export default function ProductDetails() {
	
	//Quantity state
	const [qty, setQty] = useState<number>(1)
	
	const cart = useSelector(selectCartItems);
	const dispatch = useDispatch();
	
	//Update total cart qty
	useEffect(() => {
		dispatch(getTotals(null));
	}, [cart, dispatch])
	
	//Add to cart
	const handleAddToCart = (product: CartProductType) => {
		dispatch(addToCart(product))
	}
	//Increase product quatity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	}
	// Decrease product quatity
	const decreaseQty = () => {
		setQty(prevQty => {
			if(prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	}
	
	//Fetch slug
	const {query} = useRouter();

	//Fetch data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: {slug: query.slug}
	});
	const {data, fetching, error} = results;

	//Waiting for data
	if(fetching) return (
		<div className="fixed w-full h-full inset-0 flex justify-center items-center">
			<div className="lds-facebook">
				<div />
				<div />
				<div />
			</div>
		</div>
	)

	//Error msgs
	if(error) return <p>Niečo sa pokazilo... {error.message}</p>

	//Variables
	const {title, description, images} = data.products.data[0].attributes;
	
	return (
		<div className="container">
			<div className="product">
				<motion.div
					initial={fadeLeftAnim.hidden}
					animate={fadeLeftAnim.show}
					transition={{delay: .4}}
					className="col-span-4 col-start-7"
				>
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						modules={[Virtual, Navigation]}
						virtual
						navigation={true}
					>
						{images.data.map((image: ImageType, index: number) => (
							<SwiperSlide key={index}  virtualIndex={index}>
								<img src={image.attributes?.formats?.small?.url} alt={images.data[0].attributes.formats.small?.name}/>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
				<motion.div
					initial={fadeRightAnim.hidden}
					animate={fadeRightAnim.show}
					transition={{delay: .4}}
					className="product__content"
				>
					<h3 className="product__title">{title}</h3>
					<p className="mb-4">{description}</p>
					<div className="product__quantity">
						<span className="mr-1">Množstvo: </span>
						<span onClick={decreaseQty}>
							<i className="icon-minus" />
						</span>
						<span className="px-1.5 text-lg">{qty}</span>
						<span  onClick={increaseQty}>
							<i className="icon-plus" />
						</span>
					</div>
					<button className="btn" onClick={() => handleAddToCart({...data.products.data[0].attributes, cartQty: qty})}>Add to cart</button>
				</motion.div>
			</div>
		</div>
	);
};


