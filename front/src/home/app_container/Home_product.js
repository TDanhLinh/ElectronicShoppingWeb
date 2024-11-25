import { useEffect, useState } from 'react'
import { Product } from './Product';

export function Home_product({products}) {
    return (
        <div className="home-product">
            <div className="row sm-gutter">
                {
                    products.map((item, index) => (
                        <Product 
                            key={index}
                            item={item}
                        />
                    ))
                }
            </div>
        </div>
    )
}