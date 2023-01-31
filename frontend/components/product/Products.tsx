import Link from "next/link";
import {ProductType} from "@/interfaces/product";

export default function Product({product}:ProductType) {
	//Extract data
	const {title, price, images, slug} = product.attributes

	return (
		<div className="product-list__item">

			<Link href={`/product/${slug}`}>
				<div>
					<img src={images.data[0].attributes.formats.small?.url} alt={images.data[0].attributes.formats.small?.name} />
				</div>
			</Link>
			<div className="product-list__item-content">
				<h3 className="">{title}</h3>
				<span>{price} €</span>
			</div>
		</div>
	);
};
